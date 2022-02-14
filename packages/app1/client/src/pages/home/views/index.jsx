import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames/bind';
import styles from '../styles/index.scss';
import { fetchTestAction } from '../actions';

const cx = classNames.bind(styles);

const mapStateToProps = (state) => ({
	customTestFetch: state.getIn(['homeReducer', 'customTestFetch']),
});

const mapDispatchToProps = (dispatch) => ({
	...bindActionCreators(
		{
			fetchTest: fetchTestAction,
		},
		dispatch,
	),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Index extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// fatherNumber: 1,
		};
		this.test = this.test.bind(this);
	}

	test(txt) {
		const { fetchTest } = this.props;
		fetchTest(txt);
	}

	render() {
		return (
			<div className={cx('home-content')}>
				<div style={{ background: '#000', height: '1920px', width: '100%' }}>
					11111111111111111111111111111111 11111111111111111111111111111111 11111111111111111111111111111111
					11111111111111111111111111111111 11111111111111111111111111111111 11111111111111111111111111111111
					11111111111111111111111111111111 11111111111111111111111111111111 11111111111111111111111111111111
					11111111111111111111111111111111 11111111111111111111111111111111 11111111111111111111111111111111
					11111111111111111111111111111111 11111111111111111111111111111111 11111111111111111111111111111111
					11111111111111111111111111111111 11111111111111111111111111111111 11111111111111111111111111111111
					11111111111111111111111111111111
				</div>
			</div>
		);
	}
}
