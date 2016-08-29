import React from 'react';
import Alphabet from './alphabet'
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
							<Alphabet alphabet = { alphabet }/>
							// < span className = "alphabet" key = {alphabet} onClick = {(e)=>{this.onAlphabetClick(e)}}> 
							// 	{ alphabet } 
							// < /span> 
							)
					})
				} 
			< /div>
		)
	}
}
