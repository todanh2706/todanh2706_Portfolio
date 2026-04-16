import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import leaf from "../../Assets/Projects/leaf.png";
import emotion from "../../Assets/Projects/emotion.png";
import editor from "../../Assets/Projects/codeEditor.png";
import docommunity from "../../Assets/Projects/docommunity.png"
import suicide from "../../Assets/Projects/suicide.png";
import javaremotedirmonitor from "../../Assets/Projects/java_remote_directory_monitor.png"
import javaslangwords from "../../Assets/Projects/java_slangwords.png"
import onlineauction from "../../Assets/Projects/online_auction.png"


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
              imgPath={docommunity}
              isBlog={false}
              title="Docommunity"
              description="Docommunity is a comprehensive full-stack web application designed to facilitate seamless document sharing, community collaboration, and personal workspace organization. Built with a responsive React and Vite frontend alongside a robust Java Spring Boot backend, the platform provides users with an intuitive environment to securely upload, categorize, and discover resources. Key features include a dynamic tagging system, interactive community feeds with real-time commenting and liking mechanisms, and detailed user profiles, all supported by a high-performance PostgreSQL database architecture."
              ghLink="https://github.com/todanh2706/Docommunity"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={javaremotedirmonitor}
              isBlog={false}
              title="Java Remote Directory Monitor"
              description="Java Remote Directory Monitor is a networked desktop application designed for real-time monitoring of file system changes across distributed client machines. Built with Java Swing and TCP Sockets, the system allows a central server to remotely track file creation, deletion, and modification events across multiple clients simultaneously using multi-threading. It leverages Java NIO's WatchService for high-performance background file tracking and implements a custom modular messaging protocol to ensure reliable client-server communication."
              ghLink="https://github.com/todanh2706/Java_Remote_Directory_Monitor.git"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={javaslangwords}
              isBlog={false}
              title="Java SlangWords"
              description="Java SlangWords is a graphical desktop application built with JavaFX and Maven that enables users to look up, learn, and manage slang vocabulary. It features a comprehensive CRUD management system for slang words, a daily Slang of the Day showcase, and an interactive quiz module for guessing words and definitions. The application utilizes Java object serialization to persistently save user edits and search histories, offering an intuitive interface for an engaging learning experience."
              ghLink="https://github.com/todanh2706/Java_SlangWords.git"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={onlineauction}
              isBlog={false}
              title="Online Aution Website"
              description="WebDev_Project is a full-stack online auction application designed to provide users with a secure and dynamic bidding platform. Built using React on the frontend and an Express.js Node backend, it interfaces with a PostgreSQL database via Sequelize. The platform features user authentication, a robust product catalog, personalized watchlists, a user feedback rating system, and advanced full-text search capabilities. Containerized with Docker, the architecture ensures smooth deployment and reliable performance for handling concurrent e-commerce transactions."
              ghLink="https://github.com/todanh2706/WebDev_Project.git"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              isBlog={false}
              title="Restore File Project"
              description="RestoreFile_project is a low-level C++ utility software developed for Windows to recover deleted files natively from storage drives. Utilizing the Strategy Design Pattern, it dynamically detects volume formats and applies specialized algorithms for both NTFS and FAT32 file systems. The application directly interfaces with the Windows API to parse Boot Sectors, decode Master File Table (MFT) records, resolve Long File Names (LFN), and reconstruct raw cluster data, restoring lost files efficiently from raw disk sectors."
              ghLink="https://github.com/todanh2706/RestoreFile_project.git"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
