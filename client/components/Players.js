import React from 'react';
import Player from './Player';

export default class Players extends React.Component {

  constructor(props) {
    super(props);
  }
// className = "players"
  render() {
    return (
      <div >
        <span className="player-head">PLAYERS</span>
        {this.props.players.map(player => <Player player={player} />)}
      </div>
    );
  }
}
