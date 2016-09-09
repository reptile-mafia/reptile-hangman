import React from 'react';
import Alphabet from './Alphabet';

export default class Alphabets extends React.Component {

  constructor(props) {
    super(props);
    this.alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  }

  render() {
    return (
      <div className="alphabets">
        {
          this.alphabets.map((letter, index) => {
            const guessed = this.props.guessedLetters.includes(letter);
            return (
              <Alphabet
                key={index}
                letter={letter}
                guessed={guessed}
                serverAPI={this.props.serverAPI}
                makeGuess={this.props.makeGuess}
              />
            );
          })
        }

      </div>
    );
  }
}
