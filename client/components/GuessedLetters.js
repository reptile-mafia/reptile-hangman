import React from 'react';

export default class GuessedLetters extends React.Component {
		constructor(props) {
			super(props);
		}

		render() {
				return ( < div class = "guessedLetters" > {
						//this.props.guessedLetters
						["a", "b", "c"].map(function(letter) {
								return ( < span class = "guessedLetter" > {
										letter.toUpperCase()
									} < /span>)
								})
						} < /div>)

					}

				}