import React from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import { battle } from '../utils/api';
import PropTypes from 'prop-types';
import PlayerPreview from './PlayerPreview';
import Loading from './Loading';

//sfc, display the winner/loser's GitHub profile information
function Profile ({ info }) {

	const { avatar_url, login, name, location, company, followers, following, public_repos, blog } = info;

	return (
		<PlayerPreview
			avatar={avatar_url}
			username={login}
		>
			<ul className='space-list-items'>
				{name && <li>{name}</li>}
				{location && <li>{location}</li>}
				{company && <li>{company}</li>}
				<li>Followers: {followers} </li>
				<li>Following: {following} </li>
				<li>Public Repos: {public_repos}</li>
				{blog && <li><a href={blog}>{blog}</a></li>}
			</ul>
		</PlayerPreview>
	)
}

Profile.propTypes = {
	info: PropTypes.object.isRequired,
}

//sfc for displaying winner/loser status and Profile sfc info
function Player ({ label, score, profile }) {
	return (
		<div>
			<h1 className='header'>{label}</h1>
			<h3 style={{textAlign: 'center'}}>Score: {score}</h3>
			<Profile info={profile}/>
		</div>
	)
}

Player.propTypes = {
	label: PropTypes.string.isRequired,
	score: PropTypes.number.isRequired,
	profile: PropTypes.object.isRequired,
}

//this component performs a little calculation based on a user's starred repos, followers etc. to determine the winner/loser between
//the two chosen users
class Results extends React.Component {

	state = {
		winner: null,
		loser: null,
		error: null,
		loading: true
	}

	async componentDidMount() {
		const { playerOneName, playerTwoName } = queryString.parse(this.props.location.search);
		
		const players = await battle([playerOneName,playerTwoName]);

		//handleError in Api.js returns null if there's an error
		if (players === null) {
			return this.setState(() => ({
					error: 'Looks like there was an error. Check that both users exist on Github.',
					loading: false
			}))
		} 
		this.setState(() => ({
				error: null,
				winner: players[0],
				loser: players[1],
				loading: false
		}));
	
	}

	render() {
		const { error, winner, loser, loading } = this.state;

		if (loading === true) {
			return (
				<Loading />
			)
		}

		if (error) {
			return (
				<div>
				<p>{error}</p>
				<Link to='/battle'>Reset</Link>
				</div>
			)
		}

		return (
			<div className='row'>
				<Player
					label="Winner"
					score={winner.score}
					profile={winner.profile}
				/>
				<Player
					label="Loser"
					score={loser.score}
					profile={loser.profile}
				/> 
			</div>
		)
	}

}

export default Results;
