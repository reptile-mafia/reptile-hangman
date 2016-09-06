import React from 'react';
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Alphabet from './alphabet'
import CoolDown from './cooldown'

export default class Alphabets extends React.Component {

	constructor(props) {
		super(props);
		this.alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
	}

	render() {
		return ( 
			< div className = "alphabets"> 
				<CoolDown coolDown = {this.props.coolDown} totalCoolDown = {3000} />
				{
					this.alphabets.map((alphabet) => {
						var guessed = this.props.guessedLetters.includes(alphabet);
						return ( 
							<Alphabet alphabet={alphabet} guessed={guessed} serverAPI={this.props.serverAPI} />
							)
					})
				} 

			< /div>
		)
	}
}
