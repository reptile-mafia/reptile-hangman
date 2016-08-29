import React from 'react';
import Models from '../models/ServerAPI'

export default class Alphabet extends React.Component {

	constructor(props) {
		super(props);
	}

	isActive(){
		return 'alphabet '+ ((this.props.guessed) ? 'alphabet-guessed':'alphabet-active');
	}

	onAlphabetClick(e){
		if(!this.props.guessed){
			//Models.guesses(this.props.alphabet);
		}
	}

	render() {
		return ( 
			< div className = {this.isActive()} onClick = {(e)=>{this.onAlphabetClick(e)}}> 
				{ this.props.alphabet} 
			< /div>
		)
	}
}