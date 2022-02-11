import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import withBase from '../dependencies/WithBase';

import styles from '../styles/index.less';

const { Content, Sider } = Layout;
const cx = classNames.bind(styles);

@withRouter
@withBase
export default class Base extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: true,
		};
	}

	onCollapse = (collapsed) => {
		this.setState({ collapsed });
	};

	render() {
		const { __POWERED_BY_QIANKUN__ } = window;
		const { collapsed } = this.state;
		const { selectKeys, children, menuComponents, breadcrumbs } = this.props;

		return __POWERED_BY_QIANKUN__ ? (
			<Layout className={cx('microAppLayout')}>{children}</Layout>
		) : (
			<Layout className={cx('layout')}>
				<Sider className="sider" collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
					<div className={cx('logo')} />
					<Menu theme="dark" defaultSelectedKeys={[selectKeys]} mode="inline">
						{menuComponents}
					</Menu>
				</Sider>
				<div className={cx('main')}>
					<div className={cx('info-bar')}>这里是aeps-rc!</div>
					<Breadcrumb className={cx('subInfo-bar')}>{breadcrumbs}</Breadcrumb>
					<Content className={cx('content')}>
						{children}
						<div id="micro_app" />
					</Content>
				</div>
			</Layout>
		);
	}
}
