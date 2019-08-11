import React, { Component } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  ListGroupItem,
  ListGroup,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import _ from "lodash";

import { FaBackspace } from "react-icons/fa";
class PaperAWeekEntry extends Component {
  constructor(props) {
    super(props);

    // debounce search to avoid repeated calls to API
    this.ms_search_throttled = _.debounce(this.ms_search, 200);

    this.state = {
      query: "",
      searchbar_value: "",
      entities: [],
      selectedEntity: null
    };
  }

  render_comma_sep_list = authors => {
    return authors.map((author, i) => {
      let to_render;
      if (i === authors.length - 1) {
        // last
        if (authors.length === 1) {
          to_render = (
            <span>
              {author.name}
              <br />
            </span>
          );
        } else {
          to_render = (
            <span>
              and {author.name}
              <br />
            </span>
          );
        }
      } else if (i === authors.length - 2) {
        // penultimate
        to_render = (
          <span>
            {author.name}
            {` `}
          </span>
        );
      } else {
        //all others
        to_render = (
          <span>
            {author.name},{` `}
          </span>
        );
      }
      return <span key={author.paper_id + author.name}>{to_render}</span>;
    });
  };

  async ms_search(query) {
    const cognitiveServices = require("cognitive-services");

    const client = new cognitiveServices.academicKnowledge({
      apiKey: process.env.REACT_APP_MSCOG_KEY1,
      endpoint: "api.labs.cognitive.microsoft.com"
    });

    var parameters = {
      query: query
    };

    var response = client.interpret({
      parameters
    });
    var resp = await response;

    if (resp.interpretations.length === 0) {
      return;
    }
    var value = resp.interpretations[0].rules[0].output.value;

    // attributes, in order, are: Author name, author order, DOI, Paper name, Journal Name, Affilitation display name
    parameters = {
      expr: value,
      attributes: "AA.DAuN,AA.S,E.DOI,E.DN,E.BV,LKA.Afn,Y",
      count: 5
    };

    response = client.evaluate({
      parameters
    });

    resp = await response;

    this.setState({
      entities: resp.entities
    });
  }

  handleSearch = search_term => {
    this.ms_search_throttled(search_term);

    this.setState({
      query: search_term,
      searchbar_value: search_term
    });
  };

  handlePaperClick = paperid => {
    // find the provided ID in entities
    let ent = _.find(this.state.entities, { Id: paperid });
    this.setState({
      selectedEntity: ent,
      query: "",
      searchbar_value: ""
    });
  };

  renderHits() {
    const lg_items = this.state.entities.map(ent => {
      let authors = ent.AA;

      // sort by author order
      authors = _.sortBy(authors, [
        function(o) {
          return o.S;
        }
      ]);

      let author_names = authors.map(author => {
        return {
          name: author.DAuN,
          paper_id: ent.Id
        };
      });

      //remove duplicate authors (multiple affiliations)
      author_names = _.uniqBy(author_names, function(o) {
        return o.name;
      });

      let author_names_list = this.render_comma_sep_list(author_names);
      let journal_name = ent.BV;
      let year = ent.Y;

      return (
        <div key={ent.Id}>
          <ListGroupItem>
            <Button color="link" onClick={() => this.handlePaperClick(ent.Id)}>
              <strong>{ent.DN}</strong>
            </Button>
            <hr /> {author_names_list}
            <em>
              {journal_name}, {year}
            </em>
          </ListGroupItem>
          <br />
        </div>
      );
    });

    return <ListGroup>{lg_items}</ListGroup>;
  }

  renderPAWForm() {
    let entTitle = "";
    if (this.state.selectedEntity) {
      entTitle = this.state.selectedEntity.DN;
    }

    return (
      <Container>
        <Row>
          <Col>
            <Form>
              <FormGroup>
                <Label for="title_field">
                  <strong>Title</strong>
                </Label>
                <Input
                  type="text"
                  id="title_field"
                  placeholder="e.g., Receptive fields, binocular interaction and functional architecture in the cat's visual cortex"
                  onChange={e => console.log(e.target.value)}
                  value={entTitle}
                />
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }

  render() {
    let clear_button_render;
    if (this.state.searchbar_value) {
      clear_button_render = (
        <Col lg="2" xs="2">
          <Button
            style={{ position: "absolute", bottom: "15px" }}
            onClick={e => this.setState({ query: "", searchbar_value: "" })}
            color="danger"
          >
            <FaBackspace /> Clear Search
          </Button>
        </Col>
      );
    }
    const directory = (
      <Container>
        <Row>
          <br />
          <Col lg="9" xs="9">
            <h1> Literature Search </h1>
            <Form>
              <FormGroup>
                <Label for="search_input">
                  Search by author, year, title, or keyword:
                </Label>
                <Input
                  type="text"
                  id="search_input"
                  onChange={e => this.handleSearch(`${e.target.value}`)}
                  placeholder="e.g., Receptive fields, binocular interaction and functional architecture in the cat's visual cortex"
                  value={this.state.searchbar_value}
                />
              </FormGroup>
            </Form>
          </Col>
          {clear_button_render}
        </Row>
      </Container>
    );

    let results = null;
    if (this.state.query) {
      results = (
        <Container>
          <Row>
            <Col lg="9" xs="9">
              {this.renderHits()}
            </Col>
          </Row>
        </Container>
      );
    }

    return (
      <div>
        <br />
        {directory}
        {results}
        <hr />
        {this.renderPAWForm()}
      </div>
    );
  }
}

export default PaperAWeekEntry;
