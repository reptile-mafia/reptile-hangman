import React from 'react';
import Player from './Player';

export default class Players extends React.Component {

  constructor(props) {
    super(props);
  }
// className = "players"
  render() {
    return (
      <div>PLAYERS
        <div id="player-table">
          <table id="player-head" className="table">
            <tbody>
              {this.props.players.map((player, index) => <Player key={index} player={player} />)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
