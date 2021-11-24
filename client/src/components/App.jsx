
import React from 'react';
import axios from 'axios';
import ChatRoom from './ChatRoom.jsx';
import {Grid} from '@material-ui/core';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };
    this.getMessages = this.getMessages.bind(this);
    this.postMessages = this.postMessages.bind(this);
  }

  getMessages() {
    axios.get('http://localhost:3000/messages')
      .then((data) => {
        this.setState({
          messages: data.data
        });
      });
  }

  postMessages(message) {
    console.log(message);
    const newMessage = {
      userName: 'testUser',
      message: message.text
    };
    console.log(newMessage);
    axios.post('http://localhost:3000/messages', newMessage)
      .then(() => this.getMessages())
      .catch(err => console.log(err));
  }
  componentDidMount() {
    this.getMessages();
  }

  render() {
    return (
      <div>
        <h1>Music-Player-Component</h1>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          style={{ minHeight: '200vh', backgroundColor: 'lightgrey' }}>
          <ChatRoom messages={this.state.messages} getMessages={this.getMessages} postMessages={this.postMessages}/>
        </Grid>
      </div>
    );
  }
}

export default App;