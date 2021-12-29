import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { UserWapper } from './style';
import {Divider} from 'antd';
import { WomanOutlined,ManOutlined}from '@ant-design/icons';


class User extends PureComponent {
	render() {
		const { userdata } = this.props;
		return (
			<Fragment>
				<UserWapper>
					{userdata ? (
						<Fragment>
							<img src={userdata.getIn(['profile', 'avatarUrl'])} />
							<div className='container'>
							<div className='r1'>
							<span className='h2'>
								{userdata.getIn(['profile', 'nickname'])}
							</span>
							{userdata.getIn(['profile', 'gender'])===2?<WomanOutlined />:<ManOutlined/>}
							<span className='grade'>lv{userdata.get('level')}</span>
							</div>
							<Divider />
							<div className='selfIntroduction'>
								{userdata.getIn(['profile','signature'])}
							</div>
							</div>
						</Fragment>
					) : (
						''
					)}
				</UserWapper>
			</Fragment>
		);
	}
	componentDidMount() {
		this.props.getUserInformation(this.props.match.params.id);
	}
}

export const MapState = (state) => {
	return {
		userdata: state.getIn(['user', 'userdata']),
	};
};

export const MapDispatch = (dispatch) => {
	return {
		getUserInformation(id) {
			dispatch(actionCreators.GetUserInformation(id));
		},
	};
};

export default connect(MapState, MapDispatch)(User);
