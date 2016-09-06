import React from 'react';

export default class FrontLobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomsList: ['default'],
    };
  }

  handleJoinRoom() {
    this.props.joinRoom();
  }

  showListOfRooms() {
    return (
      <div>
        {this.state.roomsList.map((room, index) => (<p key={index}>{room}</p>))}
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1>Welcome to Hangman!</h1>
        <button onClick={e => this.handleJoinRoom(e)}>Join The Room</button>
        <div className="container">
          <div className="col-xs-5">
            {this.showListOfRooms()}
          </div>
        </div>
      </div>
    );
  }
}
