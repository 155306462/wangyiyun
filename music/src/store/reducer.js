import { combineReducers } from 'redux-immutable';
import { reducer as PlayTypeReducer } from '../common/footer/store';
import { reducer as HeaderReducer } from '../common/header/store/';
import { reducer as VideoReducer } from '../content/flv-mas/store';
import { reducer as liveStreamingReducer } from '../content/live-broadcast/store';
import { reducer as LoginReducer } from '../content/login/store';
import { reducer as BannerListReducer } from '../content/main/store';
import { reducer as NavReducer } from '../content/nav/store';
import { reducer as songListReducer } from '../content/playlist/store';
import { reducer as privateFMReducer } from '../content/private-fm/store';
import { reducer as RecentlyReducer } from '../content/recently-played/store';
import { reducer as SearchListReducer } from '../content/searchlist/store';
import { reducer as UserReducer } from '../content/user/store';
import { reducer as BasicInfoReducer } from '../content/basicinfo/store';

const reducer = combineReducers({
	header: HeaderReducer,
	searchlist: SearchListReducer,
	basicinfo:BasicInfoReducer,
	login: LoginReducer,
	bannerlist: BannerListReducer,
	playtype: PlayTypeReducer,
	nav: NavReducer,
	history: RecentlyReducer,
	songList: songListReducer,
	liveStreaming: liveStreamingReducer,
	privatefm: privateFMReducer,
	vediomv: VideoReducer,
	user: UserReducer,
});

export default reducer;
