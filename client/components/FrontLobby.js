import React from 'react';
import Login from './Login';

export default class FrontLobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomsList: ['default', 'get ripped', 'go home'],
      username: '',
    };
  }

  handleJoinRoom() {
    this.props.joinRoom();
  }

  handleLogin(username) {
    this.setState({
      username: username,
    });
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
        <Login handleLogin={e => this.handleLogin(e)} />
      </div>
    );
  }
}
