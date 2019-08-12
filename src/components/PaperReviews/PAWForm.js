import React, { Component } from "react";
import { Container, Row, Col, Form, FormGroup, Label, Input } from "reactstrap";
import { capitalCase } from "./utils.js";
import ExpandableList from "./ExpandableList";

class PAWForm extends Component {
  renderAuthorFields() {}

  render() {
    // render author fields
    let author_fields = (
      <ExpandableList
        items={this.props.author_names}
        itemUpdateHandler={this.props.updateAuthorsHandler}
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
                      placeholder="e.g., Receptive fields, binocular interaction and functional architecture in the cat's visual cortex"
                      onChange={e => console.log(e.target.value)}
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
                      placeholder="MM-YYYY"
                      onChange={e => console.log(e.target.value)}
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
                    {author_fields}
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
                      onChange={e => console.log(e.target.value)}
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
                      onChange={e => console.log(e.target.value)}
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
}
export default PAWForm;
