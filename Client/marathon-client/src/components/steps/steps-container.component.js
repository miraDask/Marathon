import React from 'react';
import StepIconContainer from '../../components/steps/step-icon-container.component';
import StepTextContainer from '../../components/steps/step-text-container.component';

const StepsContainer = () => (
	<div class="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
		<div class="flex relative pb-12">
			<StepIconContainer name="account" bgColor="green-400" />
			<StepTextContainer title="ACCOUNT">
				Creating account is the first step to your successful project management!
			</StepTextContainer>
		</div>
		<div class="flex relative pb-12">
			<StepIconContainer name="project" bgColor="green-400" />
			<StepTextContainer title="PROJECT">Create project. Marathon will help to manage it!</StepTextContainer>
		</div>
		<div class="flex relative pb-12">
			<StepIconContainer name="team" bgColor="green-400" />
			<StepTextContainer title="TEAM">Create a team. Someone has to do the work.</StepTextContainer>
		</div>
		<div class="flex relative pb-12">
			<StepIconContainer name="done" bgColor="green-400" />
			<StepTextContainer title="READY">
				Congratulations! Now you can start planning the work of your team.
			</StepTextContainer>
		</div>
		<div class="flex relative">
			<StepIconContainer name="enjoy" bgColor="green-400" />
			<StepTextContainer title="Enjoy">
				Don't forget to enjoy your work! With Marathon it's easy to do it.
			</StepTextContainer>
		</div>
	</div>
);

export default StepsContainer;
