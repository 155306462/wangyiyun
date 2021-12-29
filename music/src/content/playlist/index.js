import { Tabs } from 'antd';
import 'antd/dist/antd.css';
import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreators as FooteractionCreators } from '../../common/footer/store';
import { actionCreators } from './store';
import {
	LatestComment,
	ListListWapper,
	PlayListHeaderWapper,
	PlayListWapper,
	SongCollectionWapper,
	SongListbyList,
} from './style';
import { Comment, Tooltip, Avatar,List } from 'antd';
import moment from 'moment';

const { TabPane } = Tabs;


class PlayList extends PureComponent {
	render() {
		const { songListInformation, addplay, songcollection, songComments } =
			this.props;
		return (
			<Fragment>
				<PlayListWapper>
					<PlayListHeaderWapper>
						{songListInformation ? (
							<Fragment>
								<div className='father'>
									<img
										alt='code520'
										src={songListInformation.getIn(['playlist', 'coverImgUrl'])}
									></img>
									<div className='right'>
										<h3>{songListInformation.getIn(['playlist', 'name'])}</h3>
										<div className='user'>
											<img
												alt='code520'
												src={songListInformation.getIn([
													'playlist',
													'creator',
													'avatarUrl',
												])}
											></img>
											<span>
												{songListInformation.getIn([
													'playlist',
													'creator',
													'nickname',
												])}
											</span>
											<span className='create'>
												{new Date(
													songListInformation.getIn(['playlist', 'createTime'])
												).toLocaleDateString()}
												创建
											</span>
										</div>
										<div className='label'>
											<span>标签:</span>
											{songListInformation.getIn(['playlist', 'tags'])
												? songListInformation
														.getIn(['playlist', 'tags'])
														.map((val, index) => {
															return <p key={index}>{val}</p>;
														})
												: ''}
										</div>
										<div className='introduce'>
											<span>介绍:</span>
											<span className='txt'>
												{songListInformation.getIn(['playlist', 'description'])}
											</span>
										</div>
									</div>
								</div>
								<Fragment>
									<Tabs defaultActiveKey='2' className='content'>
										<TabPane tab='歌曲列表' key='1'>
											<ListListWapper>
												<table>
													<thead>
														<tr>
															<td>音乐标题</td>
															<td>歌手</td>
															<td>专辑</td>
														</tr>
													</thead>
													<tbody>
														{songListInformation.getIn(['playlist', 'tracks'])
															? songListInformation
																	.getIn(['playlist', 'tracks'])
																	.map((item, index) => {
																		return (
																			<tr
																				key={index}
																				onClick={() =>
																					addplay(item.getIn(['id']))
																				}
																			>
																				<td key={index}>{item.get('name')}</td>
																				<td>
																					{item.get('ar').map((val, index) => {
																						return (
																							<Fragment key={index + 1}>
																								{val.get('name')}
																							</Fragment>
																						);
																					})}
																				</td>
																				<td key={index + 3}>
																					{item.getIn(['al', 'name'])}
																				</td>
																			</tr>
																		);
																	})
															: ''}
													</tbody>
												</table>
											</ListListWapper>
										</TabPane>
										<TabPane tab='评论' key='2'>
											<LatestComment>
												<textarea></textarea>
												<button>评论</button>
												<div id='comment'>
													<h2>最新评论</h2>
													<List
													className="comment-list"
													//header={`${songComments.get('total')} 条回复`}
													itemLayout="horizontal">
													{songComments
														? songComments
														
														.map((item,index) => {
																return (
																	<Fragment>
																	<li>
																	<Comment
                                                                       author={<a>{item.getIn(['user', 'nickname'])}</a>}
                                                                       avatar={<Avatar src={item.getIn(['user', 'avatarUrl'])} alt="Han Solo" />}
                                                                       content={<p>{item.get('content')}</p>}
                                                                       datetime={<Tooltip title={moment().format(' YYYY-MM-DD  HH:mm:ss')}>
                                                                                 <span>{new Date(
																					item.get('time')
																				).toLocaleDateString() +
																					new Date(
																						item.get('time')
																					).toLocaleTimeString()}
																				</span>
                                                                                </Tooltip>
                                                                                }
                                                                     />
																	 </li>
                                                                </Fragment>
																);
														  })
														: ''}
														</List>
												</div>
											</LatestComment>
										</TabPane>
										<TabPane tab='收藏者' key='3'>
											<SongCollectionWapper>
												{songcollection
													? songcollection.map((item, index) => {
															return (
																<SongListbyList key={index}>
																	<img
																		src={item.get('avatarUrl')}
																		alt='code520'
																	></img>
																	<div>
																		<span>{item.get('nickname')}</span>
																		<p>{item.get('signature')}</p>
																	</div>
																</SongListbyList>
															);
													  })
													: ''}
											</SongCollectionWapper>
										</TabPane>
									</Tabs>
								</Fragment>
							</Fragment>
						) : (
							''
						)}
					</PlayListHeaderWapper>
				</PlayListWapper>
			</Fragment>
		);
	}
	componentDidMount() {
		this.props.getTheSongListInformation(this.props.match.params.id);
		this.props.getASongListCollector(this.props.match.params.id);
		this.props.getComments(this.props.match.params.id);
	}
}

export const MapState = (state) => {
	console.log(state.getIn(['songList', 'songComments','comments']));
	return {
		songListInformation: state.getIn(['songList', 'songListInformation']),
		songcollection: state.getIn(['songList', 'songCollection', 'subscribers']),
		songComments: state.getIn(['songList', 'songComments','comments']),
	};
};

export const MapDispatch = (dispatch) => {
	return {
		getTheSongListInformation(songoneid) {
			dispatch(actionCreators.getTheSongListInformation(songoneid));
		},
		addplay(id) {
			dispatch(FooteractionCreators.AddMusic(id));
			dispatch(FooteractionCreators.BannerMusicPlay());
		},
		getASongListCollector(id) {
			dispatch(actionCreators.getASongListCollector(id));
		},
		getComments(id) {
			dispatch(actionCreators.GetComments(id));
		},
	};
};

export default connect(MapState, MapDispatch)(PlayList);
