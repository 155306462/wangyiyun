import axios from 'axios';
import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

export const GetTheSongInformation = (data) => ({
	type: actionTypes.SONG_INFORMATION,
	data: fromJS(data),
});

export const GetASongLyric = (data) => ({
	type: actionTypes.SONG_LYRIC,
	data: fromJS(data),
});

export const GetSongComments = (data) => ({
	type: actionTypes.GET_SONG_COMMENTS,
	data: fromJS(data),
});

export const getTheSongInformation = (id) => {
	return (dispatch) => {
		axios
			.get(
				`http://localhost:3000/song/detail?ids=${id}&t=${new Date().getTime()}`
			)
			.then((res) => {
				const data = res;
				dispatch(GetTheSongInformation(data.data));
			})
			.catch(() => {
				console.error('获取歌曲信息失败');
			});
	};
};

export const getASongLyric = (id) => {
	return (dispatch) => {
		axios
			.get(
				`http://localhost:3000/lyric?id=${id}&t=${new Date().getTime()}`
			)
			.then((res) => {
				//console.log(res);
				const data = res;
				dispatch(GetASongLyric(data.data));
			})
			.catch(() => {
				console.error('获取歌词失败');
			});
	};
};

export const GetComments = (id) => {
	return (dispatch) => {
		console.log(id)
		axios
			.get(
				`http://localhost:3000/comment/music?id=${id}&t=${new Date().getTime()}}`
			)
			.then((res) => {
				
				const data = res;
				dispatch(GetSongComments(data.data));
			})
			.catch(() => {
				console.error('获取歌曲评论信息失败');
			});
	};
};
