import React from 'react';
import firebase from 'firebase';
// import ServerAPI from '../models/ServerAPI';
import Login from './Login';
import FrontLobby from './FrontLobby';
import Room from './Room';
import firebaseConfig from '../../firebaseConfig.js';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      play: false,
      auth: false,
      username: '',
    };
  }

  componentWillMount() {
    firebase.initializeApp(firebaseConfig);
    const test = firebase.database().ref('test');
    test.on('value', (data) => {
      console.log('data', data.val());
    });
  }

// showRoom()
// handleNew()
  handleJoin() {
    this.setState({
      play: true,
    });
  }

  handleLogin(username) {
    this.setState({
      username: username,
      auth: true,
    });
  }

  render() {
    return (
      <div className="app">
        {!this.state.auth
          ? <Login handleLogin={e => this.handleLogin(e)} />
          : null
        }
        {this.state.play
          ? <Room />
          : <FrontLobby joinRoom={e => this.handleJoin(e)} />
        }
      </div>
    );
  }
}
