import React from 'react';

export default class Alphabet extends React.Component {

  constructor(props) {
    super(props);
  }

  onAlphabetClick() {
    console.log(this.props.letter);
    if (!this.props.guessed) {
      this.props.serverAPI.makeGuess(this.props.letter);
    }
  }

  isActive() {
    return `alphabet ${((this.props.guessed) ? 'alphabet-guessed' : 'alphabet-active')}`;
  }

  render() {
    return (
      <div className={this.isActive()} onClick={(e) => { this.onAlphabetClick(e); }}>
        {this.props.letter}
      </div>
    );
  }
}

