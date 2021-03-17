import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { SessionContext, getSessionCookie } from "../../libs/sessions";
import Skeleton from "react-loading-skeleton";
import { AuthorizedHeader } from "../header";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
var axios = require("axios");

export default function Browse() {
  const session = useContext(SessionContext);
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  let history = useHistory();

  useEffect(() => {
    let c = getSessionCookie();
    if (c.login == null) {
      console.log("Cant access browse page if not logged in.");
      //   setSessionCookie({});
      history.push("/signout");
    }
  }, [session]);

  return (
    <div>
      <AuthorizedHeader />
      <Container className="mt-5 pb-5 bg-dark rounded shadow-lg">
        <Row className="justify-content-md-center">
          <h1 class="bg-primary border rounded m-2 px-5 py-2 text-center text-light">
            Top Games Right Now
          </h1>
        </Row>
        <Row class="mt-1">
          <Col>
            <GameCard
              title="Valorant"
              imgSrc="https://static-cdn.jtvnw.net/ttv-boxart/VALORANT-285x380.jpg"
              desc="VALORANT: a 5v5 character-based tactical FPS where precise gunplay meets unique agent abilities"
            />
          </Col>
          <Col>
            <GameCard
              title="League of Legends"
              imgSrc="https://static-cdn.jtvnw.net/ttv-boxart/League%20of%20Legends-285x380.jpg"
              desc="League of Legends is an online game that blends the speed and intensity of an RTS with RPG elements."
            />
          </Col>
          <Col>
            <GameCard
              title="GTA 5"
              imgSrc="https://static-cdn.jtvnw.net/ttv-boxart/Grand%20Theft%20Auto%20V-285x380.jpg"
              desc="Grand Theft Auto V is a 2013 action-adventure game developed by Rockstar North and published by Rockstar Games. "
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

function GameCard(props) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={props.imgSrc} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        {/* <Card.Text>{props.desc}</Card.Text> */}
        <Button variant="primary">Watch</Button>
      </Card.Body>
    </Card>
  );
}
