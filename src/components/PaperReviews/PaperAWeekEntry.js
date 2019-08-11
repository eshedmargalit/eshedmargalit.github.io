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
import moment from "moment";

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

    // attributes, in order, are: Author name, author order, DOI, Paper name, Journal Name, Affilitation display name, publication year, publication date
    parameters = {
      expr: value,
      attributes: "AA.DAuN,AA.AfN,AA.S,E.DOI,E.DN,E.BV,Y,D",
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

  capitalCase = input_str => {
    input_str = input_str.toLowerCase();
    const words = input_str.split(" ");

    var new_str = "";
    for (let i = 0; i < words.length; i++) {
      var word = words[i];
      if (
        word === "and" ||
        word === "or" ||
        word === "in" ||
        word === "of" ||
        word === "the" ||
        word === "an" ||
        word === "at"
      ) {
        new_str += " " + word;
      } else {
        new_str += " " + word[0].toUpperCase() + word.substr(1).toLowerCase();
      }
    }

    return new_str;
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

  renderAuthorFields(authors) {
    // sort by author order
    authors = _.sortBy(authors, [
      function(o) {
        return o.S;
      }
    ]);

    var author_names = authors.map(author => {
      return author.DAuN;
    });

    //remove duplicate authors (multiple affiliations)
    author_names = _.uniq(author_names);

    let author_field_items = author_names.map(name => {
      return <li key={name}>{name}</li>;
    });

    return <ul>{author_field_items}</ul>;
  }

  renderInstitutionFields(authors) {
    var author_inst = authors.map(author => {
      return this.capitalCase(author.AfN);
    });

    //remove duplicate authors (multiple affiliations)
    author_inst = _.uniq(author_inst);

    let author_field_items = author_inst.map(inst => {
      return <li key={inst}>{inst}</li>;
    });

    return <ul>{author_field_items}</ul>;
  }

  renderPAWForm() {
    let entTitle = "";
    let entDate = "";
    let entDOI = "";
    let entJournal = "";
    let entURL = "";
    let author_fields = null;
    let institution_fields = null;

    if (this.state.selectedEntity) {
      entTitle = this.state.selectedEntity.DN;
      entDate = moment(this.state.selectedEntity.D, "YYYY-MM-DD").format(
        "MMMM YYYY"
      );
      entDOI = this.state.selectedEntity.DOI;
      entJournal = this.state.selectedEntity.BV;

      // author fields
      let authors = this.state.selectedEntity.AA;

      author_fields = this.renderAuthorFields(authors);
      institution_fields = this.renderInstitutionFields(authors);
    }

    return (
      <Container>
        <Row>
          <Col>
            <h1> Paper-A-Week Entry </h1>
            <h4> Paper Metadata </h4>
            <Form>
              <Row>
                <Col lg="8" xs="12">
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
                </Col>
                <Col lg="4" xs="12">
                  <FormGroup>
                    <Label for="date_field">
                      <strong>Publication Date</strong>
                    </Label>
                    <Input
                      type="text"
                      id="date_field"
                      placeholder="MM-YYYY"
                      onChange={e => console.log(e.target.value)}
                      value={entDate}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col lg="6" xs="12">
                  <h5> Authors </h5>
                  {author_fields}
                </Col>

                <Col lg="6" xs="12">
                  <FormGroup>
                    <h5> Institutions </h5>
                    {institution_fields}
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col lg="4" xs="4">
                  <FormGroup>
                    <Label for="journal_field">
                      <strong>Journal</strong>
                    </Label>
                    <Input
                      type="text"
                      id="journal_field"
                      placeholder="Nature"
                      onChange={e => console.log(e.target.value)}
                      value={entJournal}
                    />
                  </FormGroup>
                </Col>
                <Col lg="4" xs="4">
                  <FormGroup>
                    <Label for="doi_field">
                      <strong>DOI</strong>
                    </Label>
                    <Input
                      type="text"
                      id="doi_field"
                      onChange={e => console.log(e.target.value)}
                      value={entDOI}
                    />
                  </FormGroup>
                </Col>
                <Col lg="4" xs="4">
                  <FormGroup>
                    <Label for="url_field">
                      <strong>Paper URL</strong>
                    </Label>
                    <Input
                      type="text"
                      id="url_field"
                      onChange={e => console.log(e.target.value)}
                      value={entURL}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col>
                  <FormGroup>
                    <Label for="tldr_field">
                      <strong>TL;DR</strong>
                    </Label>
                    <Input
                      type="text"
                      id="tldr_field"
                      placeholder="Authors et al. show that ..."
                      onChange={e => console.log(e.target.value)}
                      value=""
                    />
                  </FormGroup>
                </Col>
              </Row>
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
                  Choose a paper here to autopopulate the fields below.
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
