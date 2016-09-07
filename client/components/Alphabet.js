import React from 'react';
import keydown from 'react-keydown';

class Alphabet extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      keypress: '',
      alphabet: this.props.alphabet,
    };
  }

  componentWillReceiveProps({ keydown }) {
    if (keydown.event) {
      this.props.serverAPI.makeGuess(keydown.event.key);
    }
  }

  onAlphabetClick() {
    console.log(this.props.alphabet);
    if (!this.props.guessed) {
      this.props.serverAPI.makeGuess(this.state.alphabet);
    }
  }

  isActive() {
    return `alphabet ${((this.props.guessed) ? 'alphabet-guessed' : 'alphabet-active')}`;
  }

  render() {
    return (
      <button className={this.isActive()} onClick={(e) => { this.onAlphabetClick(e); }}>
        {this.state.alphabet}
      </button>
    );
  }
}

export default keydown(Alphabet);
