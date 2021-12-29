import styled from 'styled-components';

export const UserWapper = styled.div`
	flex: 1;
	height: auto;
	/* background-color: #096; */
	::-webkit-scrollbar {
		width: 0px;
		height: 0px;
		background-color: rgba(240, 240, 240, 1);
	}
	img {
		display:inline-block;
		vertical-align: middle;
		margin-left:10px;
		margin-top:10px;
		border-radius: 10px;
		box-shadow:0 2px 4px rgba(0,0,0,.12),0 0 6px rgba(0,0,0,.04);
		
	}
	.container{
		height: 100px;
		margin-left:20px;
		display:inline-block;
		vertical-align: middle;
		flex-direction: column;
	}
	.r1{
		

	}
	.h2 {
		
		font-weight: 600;
		font-size: 20px;
		padding: 4px;
	}
	
	.grade {
		margin-left:20px;
		padding-top: 6px;
		font-size: 12px;
	}
  .selfIntroduction{
    font-size: 13px;
	font-weight: 300;
    font-family: 宋体;
  }
`;
