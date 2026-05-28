import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";



function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>


          <Col md={4} className="project-card">
            <ProjectCard
              isBlog={false}
              title="Concert Ticket Booking Platform"
              description="High-traffic Spring Boot booking service with PostgreSQL, Redis, and RabbitMQ to prevent overselling and voucher abuse."
              ghLink="https://github.com/todanh2706/Concert_Ticket_Booking"
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              isBlog={false}
              title="Comic Reader"
              description="Full-stack comic reading platform with an Android app, Spring Boot 3 backend, and PostgreSQL. Features automated crawling, JWT auth, role system, coin wallet, Creator Studio, and AI summaries."
              ghLink="https://github.com/ndhung1104/comic-reader-app"
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              isBlog={false}
              title="Oracle Admin App"
              description="JavaFX desktop application for Oracle 21c database administration, featuring user management, security workflows, auditing, and automated backup strategies utilizing Docker."
              ghLink="https://github.com/ndhung1104/oracle-admin-app"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              isBlog={false}
              title="PetCareX"
              description="Veterinary clinic management system with appointment booking, medical records, vaccination tracking, retail management, role-based access, and customer loyalty programs."
              ghLink="https://github.com/ndhung1104/CSDLNC-09"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              // imgPath={unihub}
              isBlog={false}
              title="UniHub Workshop"
              description="University workshop platform with a Spring Boot backend, React portal, and offline-first React Native check-in app."
              ghLink="https://github.com/todanh2706/UniHub"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              isBlog={false}
              title="Docommunity"
              description="Full-stack document sharing platform with community feeds, tagging, and user profiles. Built with React, Spring Boot, and PostgreSQL."
              ghLink="https://github.com/todanh2706/Docommunity"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              isBlog={false}
              title="Java Remote Directory Monitor"
              description="Networked Java Swing desktop app for real-time file monitoring across distributed clients using TCP Sockets and NIO WatchService."
              ghLink="https://github.com/todanh2706/Java_Remote_Directory_Monitor"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              isBlog={false}
              title="Java SlangWords"
              description="JavaFX desktop app for slang vocabulary lookup, CRUD management, daily word showcases, and interactive quiz games."
              ghLink="https://github.com/todanh2706/Java_SlangWords"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              isBlog={false}
              title="Online Aution Website"
              description="Full-stack auction platform with auth, catalog, watchlists, ratings, full-text search, and Docker deployment."
              ghLink="https://github.com/todanh2706/WebDev_Project"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              isBlog={false}
              title="Restore File Project"
              description="Windows C++ utility for recovering deleted files from NTFS and FAT32 drives using the Windows API and MFT parsing."
              ghLink="https://github.com/todanh2706/RestoreFile_project"
            />
          </Col>

        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
