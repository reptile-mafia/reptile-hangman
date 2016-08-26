import React from 'react';
//import * as Models from '../models/'
import Alphabet from './Alphabet.js';
import Gallows from './Gallows.js';
import Letters from './Letters.js';
import RemainingGuess from './RemainingGuess.js';
import Word from './Word.js';

export default class GameBoard extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			word: [],
			letters: [],
			remainingGuess: 0
		};
	}

	render() {
		return(
			<div>
				Hello!
				<Gallows remainingGuess={this.state.remainingGuess} />
				<RemainingGuess remainingGuess={this.state.remainingGuess} />
				<Word word={this.state.word} letters={this.state.letters} />
				<Letters />
				<Alphabet />
			</div>
		)
	}

}

