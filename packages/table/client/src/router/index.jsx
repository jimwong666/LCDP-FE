import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderRoutes from './renderRoutes';
import routes from './routes';

const { __POWERED_BY_QIANKUN__, APP_NAME } = window;

export default function RootRouter() {
	return <Router basename={__POWERED_BY_QIANKUN__ ? `/${APP_NAME}` : '/'}>{renderRoutes(routes)}</Router>;
}
