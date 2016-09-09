import React from 'react';
import keydown from 'react-keydown';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

class Alphabet extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      keypress: '',
      letter: this.props.letter,
    };
  }

  componentWillReceiveProps({ keydown }) {
    if (keydown.event) {
      this.props.serverAPI.makeGuess(keydown.event.key);
    }
  }

  onAlphabetClick() {
    console.log(this.props.letter);
    if (!this.props.guessed) {
      this.props.makeGuess(this.state.letter);
    }
  }

  isActive() {
    return `alphabet btn ${((this.props.guessed) ? 'alphabet-guessed' : 'alphabet-active')}`;
  }

  render() {
    return (
      <button className={this.isActive()} onClick={(e) => { this.onAlphabetClick(e); }}>
        {this.state.letter}
      </button>
    );
  }
}

export default keydown(letters)(Alphabet);
