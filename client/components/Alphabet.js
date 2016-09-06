import React from 'react';

export default class Alphabet extends React.Component {

  constructor(props) {
    super(props);
  }

  onAlphabetClick() {
    console.log(this.props.alphabet);
    if (!this.props.guessed) {
      this.props.serverAPI.makeGuess(this.props.alphabet);
    }
  }

  isActive() {
    return `alphabet ${((this.props.guessed) ? 'alphabet-guessed' : 'alphabet-active')}`;
  }

  render() {
    return (
      <div className={this.isActive()} onClick={(e) => { this.onAlphabetClick(e); }}>
        { this.props.alphabet}
      </div>
    );
  }
}

