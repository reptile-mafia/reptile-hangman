import React from 'react';
import Alphabet from './alphabet'

export default class Alphabets extends React.Component {

	constructor(props) {
		super(props);
		this.alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
	}

	render() {
		return ( 
			< div className = "alphabets"> 
				{
					this.alphabets.map((alphabet) => {
						var guessed = this.props.guessedLetters.includes(alphabet);
						return ( 
							<Alphabet alphabet = { alphabet } guessed = { guessed } model = {this.props.model} />
							)
					})
				} 
			< /div>
		)
	}
}
