import React, { Component } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import ExpandableList from "./ExpandableList";

class PAWForm extends Component {
  renderAuthorFields() {}

  render() {
    // render author fields
    let author_fields = (
      <ExpandableList
        items={this.props.author_names}
        item_name="author name"
        itemUpdateHandler={this.props.updateAuthorsHandler}
      />
    );

    let institution_fields = (
      <ExpandableList
        items={this.props.institution_names}
        item_name="institution"
        itemUpdateHandler={this.props.updateInstitutionsHandler}
      />
    );

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
                      placeholder="e.g., Retinal waves coordinate patterend activity throughout the developing visual system"
                      onChange={e =>
                        this.props.updateTitleHandler(e.target.value)
                      }
                      value={this.props.title}
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
                      placeholder="2012-10"
                      onChange={e =>
                        this.props.updateDateHandler(e.target.value)
                      }
                      value={this.props.date}
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
                    <h5> Unique Institutions </h5>
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
                      onChange={e =>
                        this.props.updateJournalHandler(e.target.value)
                      }
                      value={this.props.journal}
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
                      placeholder="doi:/10.1038/nature11529"
                      onChange={e =>
                        this.props.updateDOIHandler(e.target.value)
                      }
                      value={this.props.doi}
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
                      placeholder="https://www.nature.com/articles/nature11529"
                      onChange={e =>
                        this.props.updateURLHandler(e.target.value)
                      }
                      value={this.props.url}
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
                      placeholder="Ackman et al. show that ..."
                      onChange={e =>
                        this.props.updateTLDRHandler(e.target.value)
                      }
                      value={this.props.tldr}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>

        <h4> Paper Review </h4>
        <Row>
          <Col lg="10">
            <hr />
            <h5>Summary</h5>
            <ExpandableList
              items={this.props.summary_points}
              item_name="summary point"
              itemUpdateHandler={this.props.updateSummaryHandler}
            />
          </Col>
        </Row>

        <Row>
          <Col lg="10">
            <hr />
            <h5>Background</h5>
            <ExpandableList
              items={this.props.background_points}
              item_name="background point"
              itemUpdateHandler={this.props.updateBackgroundHandler}
            />
          </Col>
        </Row>

        <Row>
          <Col lg="10">
            <hr />
            <h5>Approach</h5>
            <ExpandableList
              items={this.props.approach_points}
              item_name="approach point"
              itemUpdateHandler={this.props.updateApproachHandler}
            />
          </Col>
        </Row>

        <Row>
          <Col lg="10">
            <hr />
            <h5>Results</h5>
            <ExpandableList
              items={this.props.results_points}
              item_name="results point"
              itemUpdateHandler={this.props.updateResultsHandler}
            />
          </Col>
        </Row>

        <Row>
          <Col lg="10">
            <hr />
            <h5>Conclusions</h5>
            <ExpandableList
              items={this.props.conclusions_points}
              item_name="conclusions point"
              itemUpdateHandler={this.props.updateConclusionsHandler}
            />
          </Col>
        </Row>

        <Row>
          <Col lg="10">
            <hr />
            <h5>Other</h5>
            <ExpandableList
              items={this.props.other_points}
              item_name="other point"
              itemUpdateHandler={this.props.updateOtherHandler}
            />
          </Col>
        </Row>

        <hr />
        <Row>
          <Col lg="5" xs="5">
            <Input
              type="text"
              value={this.props.json_name}
              onChange={e => this.props.changeJSONName(e.target.value)}
            />
          </Col>
          <Col lg="3" xs="3">
            <Button color="danger" onClick={this.props.saveJSON}>
              {" "}
              Save to JSON{" "}
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default PAWForm;