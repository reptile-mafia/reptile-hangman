import React from 'react';  
import Login from './Login';

export default class FrontLobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomsList: ['default', 'get ripped', 'go home'],
    };
  }

  componentWillMount() {
    const fb_games = firebase.database().ref('games');


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


    fb_games.on('value', (data) => {
      console.log('data', data.val());
    });
  }

  handleJoinRoom() {
    this.props.joinRoom();
  }

  showListOfRooms() {
    return (
      <ul className="room-list-item">
        {
          this.state.roomsList.map((room, index) => {
            return (
              <li key={index}>
                {room}
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
