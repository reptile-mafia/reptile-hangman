import React from 'react';
import firebase from 'firebase';
import CreateGame from './CreateGame';

export default class FrontLobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomsList: [],
      usersList: [],
      showCreate: false,
      fbGames: firebase.database().ref('games'),
      fbUsers: firebase.database().ref('users/'),
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
      }); // end data.forEach
      console.log('processed data', roomArray);

      this.state.fbUsers.on('value', (data) => {
        console.log('fbUsers data = ', data.val());
        const usersArray = [];
        data.forEach(user => {
          usersArray.push({
            id: user.key,
            name: user.child('username').val(),
            winCount: user.child('winCount').val(),
          }); // end .push
        }); // end data.forEach
        usersArray.sort(this.userCompare);
        console.log("usersArray = ", usersArray);

        this.setState({
          roomsList: roomArray,
          usersList: usersArray,
        }); // end setState
      }); // end state.fbUsers
    }); // end state.fbGames
  } // end componentWillMount


  userCompare(a, b) {
      if (a.winCount > b.winCount) { //is less than b by some ordering criterion)
        return -1;
      }
      if (a.winCount < b.winCount) { //is greater than b by the ordering criterion) {
        return 1;
      }
      // a must be equal to b
      return 0;
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
                className="btn join-button"
                onClick={() => this.handleJoinRoom(room.id)}
              >Join</button>
            </li>
            )
        }
      </ul>
    );
  }

  showUserScoreboard() {
    return (
      <div className="col-s-12">
          <h1>Leaderboard</h1>
          <div className="col-xs-6">
               <h4>Users</h4>
          </div>
          <div className="col-xs-6">
               <h4>Wins</h4>
          </div>
          <ul className="user-list-item">
            {
              this.state.usersList.map((user, index) =>
                <li key={index} >
                  <div className="col-xs-6">
                    {`${user.name}`}
                  </div>
                  <div className="col-xs-6">  
                    {`${user.winCount}`}
                  </div>
                  <br />
                </li>
                )
           }
          </ul>
      </div>
      ); // end return
  } // end userScoreboard

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
            <div className="col-xs-3">
              {this.showUserScoreboard()}
            </div>
            <div className="col-xs-6">
              {this.showListOfRooms()}
            </div>
            <div className="col-xs-3">
              <button
                id="new-game"
                className="btn join-button"
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
