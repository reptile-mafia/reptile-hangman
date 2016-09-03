import React from 'react';
import ServerAPI from '../models/ServerAPI';
import Room from './Room';

export default class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {		
			play: true
		};
	}

	render() {
		return(
			<div className="app">
				{
					(this.state.play)?<Room />: null
				}	
			</div>
		)
	}

}
