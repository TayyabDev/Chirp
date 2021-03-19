import React, { useState, useContext, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
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
      history.push("/signout");
    } else {
      axios.get("/api/streams", { withCredentials: true }).then(
        (response) => {
          console.log(response);

          setData(response.data);
        },
        (error) => {
          console.log("here");
          history.push("/login");
        }
      );
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
          {data ? (
            data.map((stream) => (
              <Col>
                <GameCard
                  title={stream.streamUser}
                  streamKey={stream.streamKey}
                  imgSrc="https://static-cdn.jtvnw.net/ttv-boxart/VALORANT-285x380.jpg"
                  desc="VALORANT: a 5v5 character-based tactical FPS where precise gunplay meets unique agent abilities"
                />
              </Col>
            ))
          ) : (
            <Skeleton count={4} />
          )}
        </Row>
      </Container>
    </div>
  );
}

function GameCardWrapper() {
  return (
    <Row class="mt-1">
      <Col></Col>
    </Row>
  );
}

function GameCard(props) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={props.imgSrc} />
      <Card.Body>
        <Card.Title>{props.title}'s stream</Card.Title>
        {/* <Card.Text>{props.desc}</Card.Text> */}
        <Button variant="primary" as={Link} to={`/watch/${props.streamKey}`}>
          Watch
        </Button>
      </Card.Body>
    </Card>
  );
}
