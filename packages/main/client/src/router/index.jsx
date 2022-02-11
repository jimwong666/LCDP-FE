import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderRoutes from './renderRoutes';
import routes from './routes';

// export default function RootRouter() {
// 	return <Router basename="/">{renderRoutes(routes)}</Router>;
// }

export default class RootRouter extends React.Component {
	componentDidMount() {
		setTimeout(() => {
			const globalCover = document.getElementById('globalCover');
			globalCover.style.display = 'none';
		}, 1000);
	}

	render() {
		return <Router basename="/">{renderRoutes(routes)}</Router>;
	}
}
