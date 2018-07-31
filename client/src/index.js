import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import ReactGA from 'react-ga';
import App from './components/App';
import Lawyer from './components/Lawyer'



function fireTracking() {
    ReactGA.pageview(window.location.hash);
}
ReactGA.initialize('UA-122460298-4');
ReactGA.pageview(window.location.pathname + window.location.search);

const history = createHistory()
history.listen((location, action) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});


//<Route exact path="/lawyer" component={Lawyer} />
const Root = () => {
	return (
		<Router onUpdate={fireTracking} history={history}>
		<Switch>
			<Route exact path="/lawyer" component={Lawyer} />
			<Route component={App} />
		</Switch>
		</Router>
		)
}

ReactDOM.render(<Root/>, document.getElementById('root'));