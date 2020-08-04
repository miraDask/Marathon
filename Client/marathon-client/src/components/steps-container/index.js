import React from 'react';
import StepIconContainer from '../step-icon-container';
import StepTextContainer from '../step-text-container';

const StepsContainer = () => (
	<div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
		<div className="flex relative pb-12">
			<StepIconContainer name="account" bgColor="green-400" />
			<StepTextContainer title="ACCOUNT">
				Creating account is the first step to your successful project management!
			</StepTextContainer>
		</div>
		<div className="flex relative pb-12">
			<StepIconContainer name="project" bgColor="green-400" />
			<StepTextContainer title="PROJECT">Create project. Marathon will help to manage it!</StepTextContainer>
		</div>
		<div className="flex relative pb-12">
			<StepIconContainer name="team" bgColor="green-400" />
			<StepTextContainer title="TEAM">
				Great projects need great teams Add your teammates to plan, track, and build great project together.
			</StepTextContainer>
		</div>
		<div className="flex relative pb-12">
			<StepIconContainer name="done" bgColor="green-400" />
			<StepTextContainer title="READY">
				Congratulations! Now you can start planning the work of your team.
			</StepTextContainer>
		</div>
		<div className="flex relative">
			<StepIconContainer name="enjoy" bgColor="green-400" />
			<StepTextContainer title="Enjoy">
				Don't forget to enjoy your work! With Marathon it's easy to do it.
			</StepTextContainer>
		</div>
	</div>
);

export default StepsContainer;
