import React from 'react';
import MainWrapper from '../../components/main/maim-wrapper.component';
import Board from '../../components/board/board.component';
const BoardPage = () => {
	return (
		<MainWrapper>
			<div className="container px-6 py-3 mx-auto flex flex-wrap">
				<Board />
			</div>
		</MainWrapper>
	);
};

export default BoardPage;
