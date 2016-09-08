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
      pageToRender: <Room roomId={roomId} username={this.state.username} />,
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
        var displayName = this.createUsername(user.email)
        this.setState({
          auth: true,
          username: displayName,
          pageToRender: <FrontLobby username={displayName} joinRoom={e => this.handleJoin(e)} />,
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

  handleLobbyClick() {
    console.log('lobby is clicked');
    this.setState({
      play: false,
      pageToRender: <FrontLobby username={this.state.username} joinRoom={e => this.handleJoin(e)} />,
    });

  }

  render() {
    return (
      <div className="app">
        <nav className="navbar navbar-static-top">
          <div className="container navcon">
            <ul className="nav navbar-header navbar-nav">
              <li className="navbar-brand">HANGMAN</li>
              <li><a onClick={this.handleLobbyClick.bind(this)}>Lobby</a></li>
            </ul>

            <ul className="nav navbar-nav navbar-right">
              <li>
                <a onClick={() => firebase.auth().signOut()}>Sign Out</a>
              </li>
            </ul>
          </div>
        </nav>
        {
          this.state.pageToRender
        }
      </div>
    );
  }
}
