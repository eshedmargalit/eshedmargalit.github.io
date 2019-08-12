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
import { render_comma_sep_list, capital_case } from "./utils.js";
import PAWForm from "./PAWForm";

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
      author_names: ["New item"],
      institution_names: ["New item"],
      summary_points: ["New item"],
      background_points: ["New item"],
      approach_points: ["New item"],
      results_points: ["New item"],
      conclusions_points: ["New item"],
      other_points: ["New item"]
    };
  }

  updateAuthorsHandler(new_value, author_idx) {
    let author_names = this.state.author_names;

    if (new_value === "") {
      author_names.splice(author_idx, 1);
    } else {
      author_names[author_idx] = new_value;
    }

    this.setState({ author_names: author_names });
  }

  updateInstitutionsHandler(new_value, institution_idx) {
    let institution_names = this.state.institution_names;

    if (new_value === "") {
      institution_names.splice(institution_idx, 1);
    } else {
      institution_names[institution_idx] = new_value;
    }

    this.setState({ institution_names: institution_names });
  }

  updateSummaryHandler(new_value, summary_point_idx) {
    let summary_points = this.state.summary_points;

    if (new_value === "") {
      summary_points.splice(summary_point_idx, 1);
    } else {
      summary_points[summary_point_idx] = new_value;
    }

    this.setState({ summary_points: summary_points });
  }

  updateBackgroundHandler(new_value, background_point_idx) {
    let background_points = this.state.background_points;

    if (new_value === "") {
      background_points.splice(background_point_idx, 1);
    } else {
      background_points[background_point_idx] = new_value;
    }

    this.setState({ background_points: background_points });
  }

  updateApproachHandler(new_value, approach_point_idx) {
    let approach_points = this.state.approach_points;

    if (new_value === "") {
      approach_points.splice(approach_point_idx, 1);
    } else {
      approach_points[approach_point_idx] = new_value;
    }

    this.setState({ approach_points: approach_points });
  }

  updateResultsHandler(new_value, results_point_idx) {
    let results_points = this.state.results_points;

    if (new_value === "") {
      results_points.splice(results_point_idx, 1);
    } else {
      results_points[results_point_idx] = new_value;
    }

    this.setState({ results_points: results_points });
  }

  updateConclusionsHandler(new_value, conclusions_point_idx) {
    let conclusions_points = this.state.conclusions_points;

    if (new_value === "") {
      conclusions_points.splice(conclusions_point_idx, 1);
    } else {
      conclusions_points[conclusions_point_idx] = new_value;
    }

    this.setState({ conclusions_points: conclusions_points });
  }

  updateOtherHandler(new_value, other_point_idx) {
    let other_points = this.state.other_points;

    if (new_value === "") {
      other_points.splice(other_point_idx, 1);
    } else {
      other_points[other_point_idx] = new_value;
    }

    this.setState({ other_points: other_points });
  }

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
      attributes: "AA.DAuN,AA.AfN,AA.S,E.DOI,E.DN,E.BV,E.S,Y,D",
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
    let source_url = "";
    if (ent.S) {
      source_url = ent.S[0].U;
    }

    let authors = _.sortBy(ent.AA, [
      function(o) {
        return o.S;
      }
    ]);

    let author_names = authors.map(author => {
      return author.DAuN;
    });

    let author_institutions = authors.map(author => {
      return capital_case(author.AfN);
    });

    //remove duplicate items (multiple affiliations)
    author_names = _.uniq(author_names);
    author_institutions = _.uniq(author_institutions);

    this.setState({
      query: "",
      searchbar_value: "",
      author_names: author_names,
      institution_names: author_institutions,
      title: ent.DN,
      date: moment(ent.D, "YYYY-MM-DD").format("MMMM YYYY"),
      doi: ent.DOI,
      journal: ent.BV,
      url: source_url
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

      let author_names_list = render_comma_sep_list(author_names);
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

  render() {
    let clear_button_render;
    if (this.state.searchbar_value) {
      clear_button_render = (
        <Col lg="2" xs="2">
          <Button
            style={{ position: "absolute", bottom: "15px" }}
            onClick={() => this.setState({ query: "", searchbar_value: "" })}
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
            <h3> Literature Search </h3>
            <Form>
              <FormGroup>
                <Label for="search_input">
                  Search Microsoft Academic Search for papers to autopopulate
                  the fields below!
                </Label>
                <Input
                  type="text"
                  id="search_input"
                  onChange={e => this.handleSearch(`${e.target.value}`)}
                  placeholder="e.g., Retinal waves nature 2012"
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
        <PAWForm
          title={this.state.title}
          date={this.state.date}
          journal={this.state.journal}
          doi={this.state.doi}
          url={this.state.url}
          author_names={this.state.author_names}
          institution_names={this.state.institution_names}
          summary_points={this.state.summary_points}
          background_points={this.state.background_points}
          approach_points={this.state.approach_points}
          results_points={this.state.results_points}
          conclusions_points={this.state.conclusions_points}
          other_points={this.state.other_points}
          updateAuthorsHandler={this.updateAuthorsHandler.bind(this)}
          updateInstitutionsHandler={this.updateInstitutionsHandler.bind(this)}
          updateSummaryHandler={this.updateSummaryHandler.bind(this)}
          updateBackgroundHandler={this.updateBackgroundHandler.bind(this)}
          updateApproachHandler={this.updateApproachHandler.bind(this)}
          updateResultsHandler={this.updateResultsHandler.bind(this)}
          updateConclusionsHandler={this.updateConclusionsHandler.bind(this)}
          updateOtherHandler={this.updateOtherHandler.bind(this)}
        />
      </div>
    );
  }
}

export default PaperAWeekEntry;
