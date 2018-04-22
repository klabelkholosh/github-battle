import React from 'react';
import Popular from './Popular';
import Home from './Home';
import Battle from './Battle';
import Results from './Results';
import Nav from './Nav';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends React.Component {
	render() {
		return (
			<Router>
				<div className='container'>
					<Nav />
					<Switch>
						<Route path='/popular' component={Popular} />
						<Route exact path='/' component={Home} />
						<Route exact path='/battle' component={Battle} />
						<Route path='/battle/results' component={Results} />
						<Route render={() => <p>Not Found</p> } />
					</Switch>
				</div>
			</Router>
		)
	}
}

export default App;