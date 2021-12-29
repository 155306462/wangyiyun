import styled from 'styled-components';

export const NavWapper = styled.div`
	width: 200px;
	height: 100vh;
	background-color: #fff;
	float: left;
	overflow: auto;
	border-right: 1px solid #ddd;
	a {
		text-decoration: none;
		:visited {
			color: #000;
		}
		:link {
			color: #000;
		}
	}
	::-webkit-scrollbar {
		width: 0px;
		height: 0px;
		background-color: rgba(240, 240, 240, 1);
	}
`;

export const NavWapperList = styled.div`
	border-radius: 4px;
	font-size: 14px;
	font-weight: 400;
	cursor: pointer;
	padding-left: 12px;
	line-height: 35px;
	margin: 12px auto;
	width: 175px;
	height: 35px;
	background-color: #fff;
	margin-top: 4px;
	:hover {
		background-color: rgb(246, 246, 247);
	}
	:visited {
		color: #000;
	}
	:link {
		color: #000;
	}
`;

// 我的音乐
export const MyMusicWapper = styled.div`
	width: 150px;
	height: 32px;
	line-height: 32px;
	margin: 0 auto;
	font-size: 12px;
	/* font-family: 宋体; */
`;

// 创建的歌单
export const SongListWapper = styled.details`
	display: block;
	width: 150px;
	height: auto;
	line-height: 32px;
	margin: 0 auto;
	font-size: 12px;
	/* font-family: 宋体; */
`;