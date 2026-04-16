import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
              I am a highly motivated <b className="purple">Software Engineering student</b> at
              <b className="purple"> VNU-HCM</b> with a strong foundation in backend architecture
              and AI-native development. I possess a builder's mindset and hands-on experience shipping
              scalable MVPs and architecting robust databases.
              <br />
              <br />
              I am proficient in languages like
              <i>
                <b className="purple">
                  {" "}
                  TypeScript, Java, C/C++, JavaScript{" "}
                </b>
              </i>
              — and I love leveraging modern AI tooling to accelerate development cycles.
              <br />
              <br />
              My key areas of interest include developing robust
              <i>
                <b className="purple">
                  {" "}
                  Backend Architectures and AI-integrated Workflows,{" "}
                </b>
              </i>
              while also building engaging user experiences.
              <br />
              <br />
              Whenever possible, I love building scalable systems with
              <b className="purple"> Spring Boot</b>, <b className="purple">Node.js</b>, and modern frontend frameworks like{" "}
              <i>
                <b className="purple">ReactJS</b> and{" "}
                <b className="purple">Next.js</b>.
              </i>
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
