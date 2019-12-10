import React, { Component } from 'react';
import './App.css';
import Message from './message/Message'
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }

    this.sallyMessages = {
      messages: [
        "Hi i am sally.",
        "How can I help?"
      ]
    }
  }

  componentDidMount() {
    axios.get('/messages').then(response => {
      this.setState({ messages: [...this.state.messages, ...response.data] });
    }
    );
  }

  componentDidUpdate() {
    this.refs.bottom.scrollIntoView({ behaviour: "smooth" });
  }

  sendMessage = (messageContent, sender) => {
    let message = {
      content: messageContent,
      sender: sender
    };
    axios.post('/messages', message)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    this.setState({ messages: [...this.state.messages, message] });
  }

  onInput = (event) => {
    event.target.rows = 1;
    var rows = parseInt((event.target.scrollHeight - 34) / 14 + 1);
    event.target.rows = rows;
    if (event.target.rows >= 10) {
      event.target.rows = 10;
      event.target.style.overflow = "auto";
    }
    else {
      event.target.style.overflow = "hidden";
      event.target.rows = rows;
    }
  }

  onSubmit = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      let messageContent = event.target.value.trim();
      if (messageContent) {
        this.sendMessage(messageContent, 'me');
        event.target.value = '';
        event.target.rows = 1;
        setTimeout(() => {
          this.sendMessage(this.sallyMessages.messages[Math.floor(Math.random() * this.sallyMessages.messages.length)], 'sally');
        }, 500);
      }

    }
  }

  listMessages = () => {
    if (this.state.messages) {
      return this.state.messages.map((message, i) => {
        return <Message key={i} sender={message.sender} content={message.content} />;
      });
    }
    else {
      return null;
    }
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className='messages-container' id="messages-container" ref='messagesList'>
            <div className="empty-part"></div>
            {this.listMessages()}
            <div ref='bottom'></div>
          </div>
          <div className="input-container">
            <textarea name="message" id="message-input" rows="1" placeholder="Type your message..." ref="message" onInput={this.onInput} onKeyPress={this.onSubmit}></textarea>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
