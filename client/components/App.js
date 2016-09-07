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

    firebase.initializeApp(firebaseConfig);
    const test = firebase.database().ref('test');
    test.on('value', (data) => {
      console.log('data', data.val());
    });

    this.state = {
      play: false,
      // auth: false,
      username: '',
      pageToRender: null,
    };
  }

  componentWillMount() {
    this.checkSession();
  }

  componentWillUpdate() {
    // this.checkSession();
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

  checkSession() {
    console.log('running');
    return firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('if', user.uid);
        if (this.state.play) {
          this.setState({
            pageToRender: <Room />,
          });
        } else {
          this.setState({
            username: user.uid,
            pageToRender: <FrontLobby username={user.uid} joinRoom={e => this.handleJoin(e)} />,
          });
        }
      } else {
        console.log('else');
        this.setState({
          pageToRender: <Login handleLogin={e => this.handleLogin(e)} />,
        });
      }
    });
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
