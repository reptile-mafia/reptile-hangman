import React from 'react';

export default class Player extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td className="player">
          {this.props.player}
        </td>
      </tr>
    );
  }
}
