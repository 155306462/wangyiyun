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
import { Comment, Tooltip, Avatar,List,Pagination } from 'antd';
import moment from 'moment';

const { TabPane } = Tabs;


class Basicinfo extends PureComponent {
    constructor(props) {
		super(props);
		this.state = {
          index:1,
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
            index:value,
			minValue: (value-1) * 20,
			maxValue: (value-1) * 20+ 20
		  });
		}
	  };
    formSongLyric=lyric=> {
        let arr = lyric.split('[');
        let result = [];
        arr.shift();
        arr.forEach(item => {
            let index = item.indexOf(']');
            item = item.slice(index+1)
            result.push(item)
        });       
        return result
    }
	render() {
		const { formSongLyric,songCommentsCount,songInformation, songLyric, songComments } =
			this.props;
		return (
			<Fragment>
				<PlayListWapper>
                    <div>
					<PlayListHeaderWapper>
						{songInformation ? 
                        songInformation.map((item, index) => {
                            return(
								<div className='father'>
									<img
										alt='code520'
										src={item.getIn(['al','picUrl'])}
                                        key={index}
									></img>
									<div className='right'>
										<h3>{item.getIn(['name'])}</h3>
										<div className='user'>
											<span>
												{item.getIn([
													'ar',
													'name'
												])}
											</span>
											<span className='create'>
												专辑-{item.getIn(['al','name'])}
											</span>
										</div>
                                <Tabs>
                                 <TabPane tab='歌词' key='1'>
                                     <div>{this.formSongLyric(songLyric).map((item)=>{
                                         return(
                                             <div>
                                             {item}
                                             </div>
                                         );
                                     })
                                     }
											
                                    </div>
                                 </TabPane>

                                  <TabPane tab='评论' key='2'>
											<LatestComment>
												<div id='comment'>
												<List
													className="comment-list"
													header={`共${songCommentsCount} 条回复`}
													itemLayout="horizontal">
													{songComments
														? songComments.map((item,index) => {
																return (
																	<Fragment>
																	<li>
																	<Comment
                                                                       author={<a>{item.getIn(['user', 'nickname'])}</a>}
                                                                       avatar={<Avatar src={item.getIn(['user', 'avatarUrl'])} alt="Han Solo" />}
                                                                       content={<p>{item.get('content')}</p>}
                                                                       datetime={<Tooltip title={moment().format(' YYYY-MM-DD  HH:mm:ss')}>
                                                                                 <span>{
																					item.get('timeStr')
																			}
																				</span>
                                                                                </Tooltip>
                                                                                }
                                                                     />
																	 </li>
                                                                </Fragment>
																);
														  })
														: ''}
                                                         <Pagination
								className='page'
                                defaultCurrent={1}
                                defaultPageSize={20}
                                onChange={this.handleChange}
          						total={songCommentsCount ? songCommentsCount : ''}
        						/>
														</List>
												    </div>
											</LatestComment>
										</TabPane>	
									</Tabs>
								
						
									</div>
								</div>);
                                })
                                : ''}
                                </PlayListHeaderWapper>
                                </div>
                               
				</PlayListWapper>
			</Fragment>
		);
	}
	componentDidMount() {
		this.props.getTheSongInformation(this.props.match.params.id);
		this.props.getASongLyric(this.props.match.params.id);
		this.props.getComments(this.props.match.params.id);
	}
}

export const MapState = (state) => {
    //console.log(state.getIn(['basicinfo', 'songLyric','lrc','lyric']));
	return {
        songCommentsCount: state.getIn(['basicinfo', 'songASongComments','total']),
		songInformation: state.getIn(['basicinfo', 'songInformation','songs']),
		songLyric: state.getIn(['basicinfo', 'songLyric','lrc','lyric']),
		songComments: state.getIn(['basicinfo', 'songASongComments','comments']),
	};
};

export const MapDispatch = (dispatch) => {
	return {
       
		getTheSongInformation(songoneid) {
			dispatch(actionCreators.getTheSongInformation(songoneid));
		},
		getASongLyric(id) {
			dispatch(actionCreators.getASongLyric(id));
		},
		getComments(id) {
			dispatch(actionCreators.GetComments(id));
		},
	};
};

export default connect(MapState, MapDispatch)(Basicinfo);
