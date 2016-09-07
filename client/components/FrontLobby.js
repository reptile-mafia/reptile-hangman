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
      const roomObj = data.val();
      const roomArray = Object.keys(data.val())
        .map(room => ({
          id: room,
          name: roomObj[room].name,
          players: roomObj[room].players,
          totalPlayers: roomObj[room].totalPlayers,
        }));
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
    const totalPlayerAmount = newGameObj.type === 'singlePlayer' ? 1 : 2;
    const newGame = this.state.fbGames.push();
    newGame.set({
      name: newGameObj.name,
      active: true,
      players: [
        {
          id: '0123',
          word: 'turtle',
        },
      ],
      totalPlayers: totalPlayerAmount,
      tries: 0,
      winner: false,
    })
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
          this.state.roomsList.map((room, index) => {
            const roomDataKeys = room.players;
            console.log('inside map: ', roomDataKeys);
            return (
              <li key={index}>
                {`id: ${room.id}`}<br />
                {`name: ${room.name}`}<br />
                {`# of players: ${room.players}`}<br />
                <button
                  className="join-button"
                  onClick={() => this.handleJoinRoom(room.id)}
                >Join</button>
              </li>
            );
          })
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
