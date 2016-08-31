import React from 'react';

export default class Players extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return ( 
			< div className = "players"> 
				{
					this.players.map((player) => {
						return ( 
							<Player player={player} />
							)
					})
				} 
			< /div>
		)
	}
}
