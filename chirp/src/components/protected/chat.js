import React from "react";
import "../../Chat.css";
import socketIOClient from "socket.io-client";

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: this.props.email,
      streamUsername: this.props.streamUsername,
      chatForm: document.getElementById('chat-form'),
      chatMessages: document.querySelector('.chat-messages'),
      userList: document.getElementById('users'),
      socket: socketIOClient("http://localhost:4001"),
    };
    console.log("PROPS:", props);
    
    const json =  {username: this.state.userEmail,
       room: this.state.streamUsername};
    this.state.socket.emit('joinRoom', json);

    this.state.socket.on('message', (message) => {
      this.outputMessage(message);
      this.state.chatMessages = document.querySelector('.chat-messages');
      // Scroll down
      this.state.chatMessages.scrollTop = this.state.chatMessages.scrollHeight;
    });
    this.outputMessage = this.outputMessage.bind(this);
    this.outputUsers = this.outputUsers.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }

  // Output message to DOM
  outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerText = message.username;
    p.innerHTML += `<span>${message.time}</span>`;
    div.appendChild(p);
    const para = document.createElement('p');
    para.classList.add('text');
    para.innerText = message.text;
    div.appendChild(para);
    document.querySelector('.chat-messages').appendChild(div);
  }

  // Add users to DOM
  outputUsers(users) {
    this.state.userList = document.getElementById('users');
    this.state.userList.innerHTML = '';
    users.forEach((user) => {
      const li = document.createElement('li');
      li.innerText = user.username;
      this.state.userList.appendChild(li);
    });
  }

  handleSend(e) {
    e.preventDefault();
    this.state.chatForm = document.getElementById('chat-form');
    this.state.chatMessages = document.querySelector('.chat-messages');
    this.state.userList = document.getElementById('users');

    // Get message text
    let msg = document.getElementById('msg').value;
    msg = msg.trim();

    if (!msg) {
    return false;
    }

    // Emit message to server
    this.state.socket.emit('chatMessage', msg);

    // Clear input
    document.getElementById('msg').value = '';
    document.getElementById('msg').focus();
  }

  render() {
    return (
      <div class="chat-container">
        <header class="chat-header">
          <h1><i class="fas fa-smile"></i> Chat</h1>
        </header>
        <main class="chat-main">
          <div class="chat-sidebar">
            <h3><i class="fas fa-users"></i> Users</h3>
            <ul id="users"></ul>
          </div>
          <div class="chat-messages"></div>
        </main>
        <div class="chat-form-container">
          <form id="chat-form">
            <input
              id="msg"
              type="text"
              placeholder="Enter Message"
              required
              autocomplete="off"
            />
            <button class="btn" onClick={this.handleSend}> Send</button>
          </form>
        </div>
      </div>
    );
  }
}