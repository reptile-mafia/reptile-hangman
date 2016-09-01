import React from 'react';
import Player from './Player'

export default class Players extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return ( 
			< div className = "players"> 
				PLAYERS
				{this.props.players.map((player)=>{
					return <Player player={player} />
				})}
			< /div>
		)
	}
}
