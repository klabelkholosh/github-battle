import React from 'react';
import PropTypes from 'prop-types';

const styles = {
	content: {
		textAlign: 'center',
		fontSize: '35px'
	}
};

class Loading extends React.Component {

	state = {
		text: this.props.text
	}

	static propTypes = {
		text: PropTypes.string.isRequired,
		speed: PropTypes.number.isRequired
	};

	static defaultProps = {
		text: 'Loading',
		speed: 300
	};
	
	//interval allows you to run a function every n amount of milliseconds.
	//this is kind of a listener and needs to be stopped with componentWillUnmount.
	//more info: The setInterval() method will continue calling the function until 
	//clearInterval() is called, or the window is closed.
	//prevState fetches whatever the prevState value was.
	//the reason we aren't using this.state.text is because
	//state may be updated asynchronously and we should not 
	//rely on its current values for calculating the next state.

	componentDidMount() {
		const { text, speed } = this.props;
		const stopper = text + '...';

		this.interval = window.setInterval(() => {
			this.state.text === stopper
			? this.setState(() => ({text}))
			: this.setState((prevState) => ({ text: prevState.text + '.' }))
		}, speed)
	}

	componentWillUnmount() {
		window.clearInterval(this.interval);
	}

	render() {
		const { text } = this.state;
		return (
			<p style={styles.content}>
				{text}
			</p>
		)
	}
}

export default Loading;
