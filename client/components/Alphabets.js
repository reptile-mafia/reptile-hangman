import React from 'react';
import Models from '../models/ServerAPI'

export default class Alphabets extends React.Component {

	constructor(props) {
		super(props);
		this.alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
	}

	onAlphabetClick(e){
		//target
		console.log(e.target);
		//Models.guesses(e.target.text())
	}

	render() {
		return ( 
			< div className = "alphabets"> 
				{
					this.alphabets.map((alphabet) => {
						return ( 
							< span className = "alphabet" key = {alphabet} onClick = {(e)=>{this.onAlphabetClick(e)}}> 
								{ alphabet } 
							< /span> )
					})
				} 
			< /div>
		)
	}
}
