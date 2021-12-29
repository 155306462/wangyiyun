import { fromJS } from 'immutable';
import { actionTypes } from './index';

const defaultState = fromJS({
	songInformation: [],
	songLyric: [],
	songComments: [],
});

const reducer = (state = defaultState, action) => {
	switch (action.type) {
		case actionTypes.SONG_INFORMATION:
			return state.merge({
				songInformation: action.data,
			});
		case actionTypes.SONG_LYRIC:
			return state.merge({
				songLyric: action.data,
			});
		case actionTypes.GET_SONG_COMMENTS:
			return state.merge({
				songASongComments: action.data,
			});
		default:
			return state;
	}
};

export default reducer;
