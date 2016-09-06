import React from 'react';
import firebase from 'firebase';
// import ServerAPI from '../models/ServerAPI';
import Room from './Room';
import FrontLobby from './FrontLobby';
import firebaseConfig from '../../firebaseConfig.js';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      play: false,
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

  render() {
    return (
      <div className="app">
        {(this.state.play)
          ? <Room />
          : <FrontLobby joinRoom={e => this.handleJoin(e)} />
        }
      </div>
    );
  }
}
