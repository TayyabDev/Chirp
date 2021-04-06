import React from "react";
import "../../Watch.css";
import socketIOClient from "socket.io-client";
var axios = require("axios");
const CHAT_SERVER_HOST = process.env.CHAT_SERVER_HOST || "localhost";

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: this.props.email,
      streamUsername: this.props.streamUsername,
      chatForm: document.getElementById("chat-form"),
      chatMessages: document.querySelector(".chat-messages"),
      socket: socketIOClient(`http://${CHAT_SERVER_HOST}:4001`),
    };

    axios.get("/api/userData", { withCredentials: true }).then((response) => {
      const json = {
        username: response.data.user.username,
        room: this.state.streamUsername,
      };
      this.state.socket.emit("joinRoom", json);

      this.state.socket.on("message", (message) => {
        this.outputMessage(message);
        this.state.chatMessages = document.querySelector(".chat-messages");
        // Scroll down
        this.state.chatMessages.scrollTop = this.state.chatMessages.scrollHeight;
      });
    });
    this.outputMessage = this.outputMessage.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }

  // Output message to DOM
  outputMessage(message) {
    const div = document.createElement("div");
    div.classList.add("message");
    const p = document.createElement("p");
    p.classList.add("meta");
    p.innerText = message.username;
    p.innerHTML += `<span>${message.time}</span>`;
    div.appendChild(p);
    const para = document.createElement("p");
    para.classList.add("text");
    para.innerText = message.text;
    div.appendChild(para);
    document.querySelector(".chat-messages").appendChild(div);
  }

  handleSend(e) {
    e.preventDefault();
    this.state.chatForm = document.getElementById("chat-form");
    this.state.chatMessages = document.querySelector(".chat-messages");

    // Get message text
    let msg = document.getElementById("msg").value;
    msg = msg.trim();

    if (!msg) {
      return false;
    }

    // Emit message to server
    this.state.socket.emit("chatMessage", msg);

    // Clear input
    document.getElementById("msg").value = "";
    document.getElementById("msg").focus();
  }

  render() {
    return (
      <div class="chat-container">
        <div class="chat-messages"></div>
        <div class="chat-form-container">
          <form id="chat-form">
            <input
              id="msg"
              type="text"
              placeholder="Enter Message"
              required
              autocomplete="off"
            />
            <button class="btn" onClick={this.handleSend}>
              {" "}
              Send
            </button>
          </form>
        </div>
      </div>
    );
  }
}
