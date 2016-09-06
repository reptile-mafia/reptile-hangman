import React from 'react';

export default class Player extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="player">
        {this.props.player}
      </div>
    );
  }
}
