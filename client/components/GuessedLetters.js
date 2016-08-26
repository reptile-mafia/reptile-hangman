import React from 'react';

export default class GuessedLetters extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return ( < div class = "guessedLetters" > {
			this.props.guessedLetters.map(function(letter) {
				return ( < div class = "guessedLetter" > {
					letter.toUpperCase()
				} < /div>)
			})

		} < /div>)

	}

}