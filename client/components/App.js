import React from 'react';
import firebase from 'firebase';
import Login from './Login';
import FrontLobby from './FrontLobby';
import Room from './Room';
import firebaseConfig from '../../firebaseConfig.js';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    firebase.initializeApp(firebaseConfig);

    const test = firebase.database().ref('test');
    test.on('value', (data) => {
      console.log('data', data.val());
    });

    this.state = {
      play: false,
      auth: false,
      username: '',
      pageToRender: null,
    };
  }

  componentWillMount() {
    this.checkSession();
  }

  handleJoin(roomId) {
    console.log('roomId', roomId);
    this.setState({
      play: true,
      pageToRender: <Room roomId={roomId} />,
    });
  }

  handleLogin(userName) {
    console.log('username: ', userName);
    this.setState({
      username: userName,
      auth: true,
    });
  }

  checkSession() {
    return firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("auth", user);
        this.setState({
          auth: true,
          username: this.createUsername(user.email),
          pageToRender: <FrontLobby username={this.createUsername(user.email)} joinRoom={e => this.handleJoin(e)} />,
        });
      } else {
        this.setState({
          pageToRender: <Login handleLogin={e => this.handleLogin(e)} />,
        });
      }
    });
  }

  createUsername(email) {
    var atIndex = email.indexOf('@');
    var username = email.slice(0, atIndex)
    return username;
  }

  render() {
    return (
      <div className="app">
        {
          this.state.pageToRender
        }
      </div>
    );
  }
}
