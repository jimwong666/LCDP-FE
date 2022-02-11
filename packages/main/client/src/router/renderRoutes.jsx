import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import menuData from '../menu';

const renderRoutes = (routes, extraProps = {}, switchProps = {}) =>
	routes ? (
		<Switch {...switchProps}>
			{routes.map((route, i) => (
				<Route
					key={route.key || i}
					path={route.path}
					exact={route.exact}
					strict={route.strict}
					render={(props) => {
						const searchObj = {};
						if (props.location.search) {
							for (const val of props.location.search.substr(1).split('&')) {
								const valArr = val.split('=');
								[, searchObj[valArr[0]]] = valArr;
							}
						}
						props.location.searchObj = searchObj;

						return (
							<route.componentTemplate
								breadcrumbArr={route.breadcrumb}
								selectKeys={route.key}
								{...props}
								{...extraProps}
								route={route}
								menuData={menuData}
							>
								<Suspense fallback={<div>loadinggggggggggggggggggggggggggggggggggggggggggggggggggggggggg</div>}>
									{route.child && <route.child />}
								</Suspense>
							</route.componentTemplate>
						);
					}}
				/>
			))}
		</Switch>
	) : null;

export default renderRoutes;
