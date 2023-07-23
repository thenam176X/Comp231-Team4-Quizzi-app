import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const About = () => {
  return (
    <Container>
      <h1>About Us</h1>
      <p>Some text about who we are and what we do.</p>
      <h2>Our Team</h2>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Jane Doe</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">CEO & Founder</Card.Subtitle>
              <Card.Text>Some text that describes Jane.</Card.Text>
              <Card.Link href="mailto:jane@example.com">jane@example.com</Card.Link>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Mike Ross</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Art Director</Card.Subtitle>
              <Card.Text>Some text that describes Mike.</Card.Text>
              <Card.Link href="mailto:mike@example.com">mike@example.com</Card.Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
