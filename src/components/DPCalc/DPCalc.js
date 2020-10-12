import React, { Component } from "react";
import { Container, Row, Col, Button, Table } from "reactstrap";
import { InlineMath, BlockMath } from "react-katex";
import { FaLink } from "react-icons/fa";
import "katex/dist/katex.min.css";

import Calc from "./Calc.js";
import "./DPCalc.css";

class DPCalc extends Component {
  renderDprimer() {
    const check_emoji = (
      <span role="img" aria-label="check mark emoji">
        ✅
      </span>
    );
    const x_emoji = (
      <span role="img" aria-label="red x emoji">
        ❌
      </span>
    );
    const mu_signal_present = <InlineMath math="\mu_{SignalPresent}" />;
    const mu_signal_absent = <InlineMath math="\mu_{SignalAbsent}" />;
    const sigma = <InlineMath>\sigma</InlineMath>;
    const infinity = <InlineMath>\infty</InlineMath>;
    return (
      <Container>
        <Row>
          <Col>
            <h3>A d&#39; Primer</h3>
            <h5> The Basics </h5>
            d&#39;, also called the sensitivity index, is the primary statistic
            used in Signal Detection Theory. At its core, d&#39; is a measure of
            how far apart two distributions are. If two distributions are
            perfectly overlapping, d&#39;=0 . If two distributions are 1
            standard deviation apart, d&#39;=1.
            <br />
            The equation is:
            <BlockMath
              math={
                "d' = \\frac{\\mu_{SignalPresent} - \\mu_{SignalAbsent}}{\\sigma}"
              }
            />
            where {mu_signal_present} is the mean of the distribution when there
            is a true signal present, {mu_signal_absent} is the mean of the
            distribution when there is no signal present, and {sigma} is the
            standard deviation of the distributions. Note that this formula
            assumes that the standard deviation (<InlineMath>\sigma</InlineMath>
            ) is equal for both distributions. See below for discussion of the
            case where this assumption is not met.
            <br />
            <br />
            <h5>Hits, Misses, False Alarms, and Correct Rejections</h5>
            <p>
              Given the SignalPresent and SignalAbsent distributions, setting a
              "criterion" tells you the hit rate, miss rate, false alarm rate,
              and correct rejection rate. In plain English, the hit rate is the
              proportion of the time that a signal is reported when there
              actually is a signal, and the false alarm rate is the proportion
              of the time that a signal is reported when there is no signal
              present.
            </p>
            <p>
              Remember, the miss rate is just one minus the hit rate, and the
              correct rejection rate is just one minus the false alarm rate, so
              knowing the hit rate gives you the miss rate, and knowing the
              false alarm rate gives you the correct rejection rate.
            </p>
            <br />
            <Row>
              <Col lg={{ size: 8, offset: 2 }} xs={{ size: 6, offset: 3 }}>
                <Table bordered>
                  <thead>
                    <tr>
                      <th></th>
                      <th>
                        <em>"Yes, there was a signal!"</em>
                      </th>
                      <th>
                        <em>"No signal here..."</em>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Signal Actually Present</th>
                      <td>{check_emoji} Hit</td>
                      <td>{x_emoji} Miss</td>
                    </tr>
                    <tr>
                      <th scope="row">Signal Actually Absent</th>
                      <td>{x_emoji} False Alarm</td>
                      <td>{check_emoji} Correct Rejection</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
            <h5> What's the Criterion? </h5>
            <p>
              The criterion indicates the amount of evidence above which a
              signal will be reported. Thus, the hit rate is the proportion of
              responses from the SignalPresent distribution above the criterion,
              and the miss rate is the propoertion of resopnses from the
              SignalPresent distribution below the criterion. The false alarm
              rate is the proportion of responses from the SignalAbsent
              distribution above the criterion, and the correct rejection rate
              is the propoertion of responses from the SignalAbsent distribution
              below the criterion. A "conservative" criterion is relatively
              high, such that both hits and false alarms will be low. A
              "liberal" criterion is relatively low, such that both hits and
              false alarms will be high.
            </p>
            <h5> ROC Curves </h5>
            <p>
              Receiver Operating Characteristic (ROC) Curves provide a visual
              representation of discriminability for a sensor. The x-axis is the
              false alarm rate and the y-axis is the hit rate. An ROC curve is
              composed of all of the false alarm rates and hit rates
              corresponding to all possible criteria one could choose from 0 to{" "}
              {infinity}. Note that d&#39; is constant along this curve, because
              different points along the curve only differ in criterion, not in
              sensor sensitivity. Increasing d&#39; moves the curve up and to
              the left, whereas decreasing d&#39; brings the curve toward the
              <InlineMath>y=x</InlineMath> unity line. The{" "}
              <InlineMath>y=x</InlineMath> unity line represents a d&#39; of 0,
              since hits and false alarms are exactly equal along that line, and
              thus, the Signal Present and Signal Absent distributions must be
              perfectly overlapping.
            </p>
            <p>
              Often, the area under the ROC curve (AUC) is used to quantify how
              sensitive a sensor is. AUC ranges from 0 to 1, with 1 being a
              perfect sensor corresponding to a d&#39; of {infinity}. How does
              the AUC numerically relate to the d&#39; value?
              <BlockMath math={"d' = \\sqrt{2}Z(AUC)"} /> where Z() is the
              inverse CDF of the Gaussian distribution.
            </p>
            <h5> Advanced Topics </h5>
            <h6> Unequal Standard Deviations </h6>
            <p>
              What if the standard deviations of the two distributions are not
              equal? No problem, just replace the denominator with the square
              root of the average variance!
              <BlockMath
                math={
                  "d' = \\frac{\\mu_{SignalPresent} - \\mu_{SignalAbsent}}{\\sqrt{\\frac{1}{2}(\\sigma_{SignaPresent}^2 + \\sigma_{SignalAbsent}^2)}}"
                }
              />
            </p>
            <h6> Computing d' from the hit rate and false alarm rate </h6>
            <p>
              If you have the hit rate and false alarm rate and can assume the
              two distributions are approximately normal, you can also compute
              d' as:
              <BlockMath math={"d' = Z(HitRate) - Z(FalseAlarmRate)"} />
              where Z() is the inverse CDF of the Gaussian distribution.
            </p>
            <hr />
            <h5> References and Future Reading </h5>
            <a
              href="http://www.cns.nyu.edu/~david/handouts/sdt/sdt.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button color="link">
                David Heeger's Signal Detection Theory Webpage <FaLink />
              </Button>
            </a>
            <a
              href="https://en.wikipedia.org/wiki/Sensitivity_index"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button color="link">
                Wikipedia Page for Sensitivity <FaLink />
              </Button>
            </a>
          </Col>
        </Row>
      </Container>
    );
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs="12" lg="12">
            <br />
            <h1>d&#39; Calculator</h1>
            <h5>
              An interactive tool for learning about signal detection theory
            </h5>
            <p>
              This webpage was designed to help students in PSYCH 30, a large
              undergradate class on Perception at Stanford University,
              understand the basics of Signal Detection Theory and the
              sensitivity index, d&#39;. Play with the calculator below and
              scroll down to read more about signal detection and how to compute
              d&#39;. If you have any issues or find bugs, please let me know
              via email!
            </p>
            <Calc />
            <hr />
            {this.renderDprimer()}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default DPCalc;
