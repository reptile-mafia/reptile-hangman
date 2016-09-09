import React from 'react';

export default class Gallows extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="gallows">
        <svg width="100%" viewBox="0 0 200 500">
          <g id="gallowRope">
            <line x1="100" y1="0" x2="100" y2="165" />
            <circle cx="100" cy="175" r="16" />
          </g>
          <g id="gallowMan">
            <circle
              id="noggin"
              className={this.props.remainingGuesses < 6 ? 'op-on' : 'op-off'}
              cx="100" cy="158" r="30"
            />
            <line
              id="torso"
              className={this.props.remainingGuesses < 5 ? 'op-on' : 'op-off'}
              x1="100" y1="193" x2="100" y2="290"
            />
            <line
              id="arm-left"
              className={this.props.remainingGuesses < 4 ? 'op-on' : 'op-off'}
              x1="100" y1="220" x2="45" y2="250"
            />
            <line
              id="arm-right"
              className={this.props.remainingGuesses < 3 ? 'op-on' : 'op-off'}
              x1="100" y1="220" x2="155" y2="250"
            />
            <line
              id="leg-left"
              className={this.props.remainingGuesses < 2 ? 'op-on' : 'op-off'}
              x1="100" y1="285" x2="55" y2="350"
            />
            <line
              id="leg-right"
              className={this.props.remainingGuesses < 1 ? 'op-on' : 'op-off'}
              x1="100" y1="285" x2="145" y2="350"
            />
          </g>
        </svg>
      </div>
    );
  }

}

