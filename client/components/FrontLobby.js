import React from 'react';
import firebase from 'firebase';

export default class FrontLobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomsList: ['default', 'get ripped', 'go home'],
    };
  }

  componentWillMount() {
    const fbGames = firebase.database().ref('games');


    // create a new room / games
    //
    //
    // let new_game = fb_games.push();
    // new_game.set({
    //   name: 'hello jello',
    //   active: true,
    //   players: [
    //     {
    //       id: '0123',
    //       word: 'turtle',
    //     },
    //   ],
    //   totalPlayers: 1,
    //   tries: 0,
    //   winner: false,
    // });


    fbGames.on('value', (data) => {
      console.log('raw data', data.val());
      const roomObj = data.val();
      const roomKeys = Object.keys(roomObj);
      const roomArray = roomKeys.map(room => ({
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

  handleJoinRoom() {
    this.props.joinRoom();
  }

  showListOfRooms() {
    return (
      <ul className="room-list-item">
        {
          this.state.roomsList.map(room => {
            const roomDataKeys = room.players;
            console.log('inside map: ', roomDataKeys);
            return (
              <li key={room.id}>
                {`id: ${room.id}`}<br />
                {`name: ${room.name}`}<br />
                {`# of players: ${room.players}`}<br />
                <button
                  className="join-button"
                  onClick={e => this.handleJoinRoom(e)}
                >Join</button>
              </li>
            );
          })
        }
      </ul>
    );
  }

  render() {
    return (
      <div>
        <h1>Welcome to Hangman, {this.state.username}!</h1>
        <div className="container">
          <div className="col-xs-2" />
          <div className="col-xs-8">
            {this.showListOfRooms()}
          </div>
          <div className="col-xs-2" />
        </div>
      </div>
    );
  }
}
