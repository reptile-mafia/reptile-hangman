import React from 'react';
import firebase from 'firebase';
import CreateGame from './CreateGame';

export default class FrontLobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomsList: [],
      showCreate: false,
      fbGames: firebase.database().ref('games'),
    };
  }

  componentWillMount() {
    this.state.fbGames.on('value', (data) => {
      console.log('raw data', data.val());
      const roomArray = [];
      data.forEach(room => {
        roomArray.push({
          id: room.key,
          name: room.child('name').val(),
          players: room.child('players').val(),
          totalPlayers: room.child('totalPlayers').val(),
        });
      });
      console.log('processed data', roomArray);
      this.setState({
        roomsList: roomArray,
      });
    });
  }

  handleJoinRoom(id) {
    this.props.joinRoom(id);
  }

  checkForUser(callback) {
    firebase.initialize();
    callback();
  }

  cancelGame() {
    this.setState({
      showCreate: false,
    });
  }

  createGame(newGameObj) {
    this.props.serverAPI.createGame(firebase.auth().currentUser.uid, newGameObj)
    .then(() => {
      this.setState({
        showCreate: false,
      });
    });
  }

  showCreateGame() {
    return this.state.showCreate
      ? <CreateGame
        createGame={e => this.createGame(e)}
        cancelGame={e => this.cancelGame(e)}
        showCreateModal
      />
      : null;
  }

  showListOfRooms() {
    return (
      <ul className="room-list-item">
        {
          this.state.roomsList.map((room, index) =>
            <li key={index}>
              {`id: ${room.id}`}
              <br />
              {`name: ${room.name}`}
              <br />
              {`type: ${room.totalPlayers === 1 ? 'Single Player' : 'Head To Head'}`}
              <br />
              {`# of players: ${room.players.length}`}
              <br />
              <button
                className="join-button"
                onClick={() => this.handleJoinRoom(room.id)}
              >Join</button>
            </li>
            )
        }
      </ul>
    );
  }

  handleCreate() {
    this.setState({
      showCreate: true,
    });
  }

  render() {
    return (
      <div>
        { this.showCreateGame() }
        <h1>Welcome to Hangman, {this.props.username}!</h1>
        <div className="container">
          <div className="row">
            <div className="col-xs-2" />
            <div className="col-xs-8">
              {this.showListOfRooms()}
            </div>
            <div className="col-xs-2">
              <button
                id="new-game"
                className="join-button"
                onClick={e => this.handleCreate(e)}
              >
                Create Game
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
