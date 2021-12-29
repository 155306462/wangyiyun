import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators as FMactionCreators } from '../private-fm/store';
import { actionCreators } from './store';
import {
	CollectionSongListWapper,
	ILikeMusicWapper,
	MyMusicWapper,
	NavWapper,
	NavWapperList,
	SongListWapper,
} from './style';

class Nav extends PureComponent {
	render() {
		const { loginstatus, changePrivateFM } = this.props;
		return (
			<Fragment>
				<NavWapper>
					<Link to='/individuation'>
						<NavWapperList>发现音乐</NavWapperList>
					</Link>
					<a href='https://music.163.com/store/product' target='_new'>
						<NavWapperList>商城</NavWapperList>
					</a>
					<Link to='/recently-played'>
						<NavWapperList>最近播放</NavWapperList>
					</Link>
					{loginstatus === true && (
							<Link
								to={`/user/${
									JSON.parse(localStorage.getItem('login')).account.id
								}/music`}
							>
							    <NavWapperList>个人主页</NavWapperList>
							</Link>
						
					)}
				</NavWapper>
			</Fragment>
		);
	}
	componentDidMount() {
		this.props.getloginstatus();
	}
}

export const MapState = (state) => {
	return {
		loginstatus: state.getIn(['nav', 'loginstatus']),
	};
};

export const MapDispatch = (dispatch) => {
	return {
		getloginstatus() {
			dispatch(actionCreators.GetLoginStatus());
		},
		changePrivateFM() {
			dispatch(FMactionCreators.GetPrivateFmData());
		},
	};
};

export default connect(MapState, MapDispatch)(Nav);
