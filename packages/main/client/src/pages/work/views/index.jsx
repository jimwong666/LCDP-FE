import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { asyncFetchPreDataAction, asyncFetchPreDataAction2 } from '../actions';
// import classNames from 'classnames/bind';
// import styles from '../styles/index.scss';
// const cx = classNames.bind(styles);

const mapStateToProps = (state) => ({
	preData: state.getIn(['workReducer', 'preData']),
	preData2: state.getIn(['workReducer', 'preData2']),
});

const mapDispatchToProps = (dispatch) => ({
	...bindActionCreators(
		{
			asyncFetchPreData: asyncFetchPreDataAction,
			asyncFetchPreData2: asyncFetchPreDataAction2,
		},
		dispatch,
	),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Work extends React.Component {
	componentDidMount() {
		const { asyncFetchPreData, asyncFetchPreData2 } = this.props;
		asyncFetchPreData();
		asyncFetchPreData2();
	}

	render() {
		const { preData, preData2 } = this.props;
		console.log('preData', preData, preData2);
		return (
			<>
				<ul>
					{preData?.data?.map((item) => {
						return (
							<li key={item.id}>
								<span>{item.name}</span>
								<img src={item.imgUrl} alt="img" />
							</li>
						);
					})}
				</ul>
				<ul>
					{preData2?.data?.map((item) => {
						return (
							<li key={item.id}>
								<span>{item.name}</span>
								<img src={item.imgUrl} alt="img" />
							</li>
						);
					})}
				</ul>
			</>
		);
	}
}
