import React from 'react';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Alphabet from './Alphabet';
import CoolDown from './CoolDown';

export default class Alphabets extends React.Component {

  constructor(props) {
    super(props);
    this.alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  }

  render() {
    return (
      <div className="alphabets">
      <CoolDown coolDown={this.props.coolDown} totalCoolDown={3000} />
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
