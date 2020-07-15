import React, { Fragment } from 'react';
import DashboardNavBar from '../../components/navigation/dashboard-navbar.component';

import MainWrapper from '../../components/main/maim-wrapper.component';
import Board from '../../components/board/board.component';
import PageTopicContainer from '../../components/containers/page-topic-container.component';
import FormButton from '../../components/buttons/form-button.component';
const BoardPage = () => {
	return (
		<Fragment>
			<DashboardNavBar otherClasses="w-full" />
			<MainWrapper>
				<PageTopicContainer size="lg:w-5/6" title="Project/Sprint">
					{/* TODO - check if there are any sprint - if not add commented props */}
					<FormButton /*disabled addClass="cursor-not-allowed"*/ textSize="text-md">
						Complete Sprint
					</FormButton>
				</PageTopicContainer>

				<div className="container px-6 mb-8 mx-auto flex flex-wrap">
					<Board />
				</div>
			</MainWrapper>
		</Fragment>
	);
};

export default BoardPage;
