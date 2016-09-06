import React from 'react';
// import ServerAPI from '../models/ServerAPI';
import Room from './Room';
import firebase from 'firebase';
import firebaseConfig from '../../firebaseConfig.js';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      play: true,
    };
  }

  componentWillMount() {
    firebase.initializeApp(firebaseConfig);
    let test = firebase.database().ref('test');
    test.on('value', function(data) {
      console.log('data', data.val());
    });
  }

  render() {
    return (
      <div className="app">
        {(this.state.play) ? <Room /> : null}
      </div>
    );
  }
}
