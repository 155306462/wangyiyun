import { Tabs,Pagination } from 'antd';
import 'antd/dist/antd.css';
import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
// 获取路由参数
import { withRouter } from 'react-router-dom';
import { actionCreators as FooteractionCreators } from '../../common/footer/store';
import { actionCreators } from './store';
import {
	SearchListWapper,
	SearchListWapperSingle,
	SearchListWapperSingleList
} from './style';
const { TabPane } = Tabs;

class SearchList extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
		  minValue: 0,
		  maxValue: 20
		};
	  }
	  handleChange = value => {
		if (value <= 1) {
		  this.setState({
			minValue: 0,
			maxValue: 20
		  });
		} else {
		  this.setState({
			minValue: (value-1) * 20,
			maxValue: (value-1) * 20+ 20
		  });
		}
	  };
	
	render() {
		const { searchsinglelist, addmusic } = this.props;
		return (
			<Fragment>
				<SearchListWapper>
					<span className='search_title'>
						搜索"{this.props.match.params.key}", 找到
						{searchsinglelist ? searchsinglelist.size : ''}首单曲
					</span>
					<Tabs defaultActiveKey='1' style={{ marginLeft: '26px' }}>
						<TabPane tab='单曲' key='1'>
							<SearchListWapperSingle>
								{searchsinglelist
									? searchsinglelist.slice(this.state.minValue, this.state.maxValue).map((item, index) => {
											return (
												<SearchListWapperSingleList onClick={(() => addmusic(item.get("id")))}>
													<td>{index + 1}</td>
													<td>{item.get('name')}</td>
													{item.getIn(['ar']).map((content, index) => {
														if (index === 0) {
															return <td>{content.get('name')}</td>;
														}
													})}
													<td>{item.getIn(['al', 'name'])}</td>
													<td>
														0{parseInt(item.get('dt') / 60 / 1000)}:
														{parseInt(item.get('dt') / 1000) -
															parseInt(item.get('dt') / 60 / 1000) * 60}
													</td>
													
												</SearchListWapperSingleList>
											);
									  })
									: ''}
								<Pagination
								className='page'
                                defaultCurrent={1}
                                defaultPageSize={20}
                                onChange={this.handleChange}
          						total={searchsinglelist ? searchsinglelist.size : ''}
        						/>
							</SearchListWapperSingle>
						</TabPane>
					</Tabs>
				</SearchListWapper>
			</Fragment>
		);
	}
	componentDidMount() {
		this.props.tosearchlist(this.props.match.params.key);
	}
}

const MapStateToProps = (state) => {
	return {
		searchsinglelist: state.getIn([
			'searchlist',
			'searchsinglelist',
			'result',
			'songs',
		]),
	};
};

const MapDispatchToProps = (dispatch) => {
	return {
		tosearchlist(key) {
			dispatch(actionCreators.ToSearchSingleList(key));
		},
		addmusic(targetid) {
			dispatch(FooteractionCreators.AddMusic(targetid));
			dispatch(FooteractionCreators.BannerMusicPlay());
		},
	};
};

export default connect(
	MapStateToProps,
	MapDispatchToProps
)(withRouter(SearchList));
