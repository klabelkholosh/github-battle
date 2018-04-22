import React from 'react';
import PropTypes from 'prop-types';

//stateless functional component for showing us the initial player's details, prior to the battle being performed
function PlayerPreview(props) {
	const { avatar, username, children } = props;
	return (
		<div>
		 <div className='column'>
		 	<img 
		 		className='avatar'
		 		src={avatar}
		 		alt={'Avatar for' + username}
		 	/>
		 	<h2 className='username'>
		 		@{username}
		 	</h2>
		 	{children}
		 </div>
		</div>
	);
}

PlayerPreview.propTypes = {
	avatar: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
}

export default PlayerPreview;
