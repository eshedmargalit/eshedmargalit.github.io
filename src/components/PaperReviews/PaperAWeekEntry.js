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

    this.handleSearchThrottled = _.throttle(this.handleSearch, 1000);

    this.state = {
      query: "",
      searchbar_value: "",
      entities: []
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
              {author}
              <br />
            </span>
          );
        } else {
          to_render = (
            <span>
              and {author}
              <br />
            </span>
          );
        }
      } else if (i === authors.length - 2) {
        // penultimate
        to_render = (
          <span>
            {author}
            {` `}
          </span>
        );
      } else {
        //all others
        to_render = (
          <span>
            {author},{` `}
          </span>
        );
      }
      return <span key={author.tag + author}>{to_render}</span>;
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

    parameters = {
      expr: value,
      attributes: "AA.DAuN,AA.AfN,AA.S,E.DOI,E.DN,E.BV,LKA.Afn,Y",
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
    this.ms_search(search_term);

    this.setState({
      query: search_term,
      searchbar_value: search_term
    });
  };

  renderHits() {
    const lg_items = this.state.entities.map(ent => {
      console.log(ent);
      let authors = ent.AA;

      // sort by author order
      authors = _.sortBy(authors, [
        function(o) {
          return o.S;
        }
      ]);

      let author_names = authors.map(author => {
        return author.DAuN;
      });

      let author_names_list = this.render_comma_sep_list(author_names);
      let journal_name = ent.BV;
      let year = ent.Y;

      return (
        <div>
          <ListGroupItem key={ent.Id}>
            <strong>{ent.DN}</strong> <hr /> {author_names_list}
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
                  placeholder="e.g., orthogonal"
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
      </div>
    );
  }
}

export default PaperAWeekEntry;
