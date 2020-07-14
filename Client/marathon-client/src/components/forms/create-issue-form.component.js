import React from 'react';

import ErrorMessageContainer from '../messages/form-input-error-message.component';
import InfoMessageContainer from '../messages/form-input-info-message.component';

import IssueFormsInput from '../inputs/issue-forms-input.component';
import CustomLabel from '../labels/custom-label.component';
import CustomSelect from '../select/custom-select.component';

const CreateIssueForm = () => {
	const types = [ 'Story', 'Task', 'Bug' ];
	const priorities = [ 'Medium', 'Highest', 'High', 'Low', 'Lowest' ];
	const statuses = [ 'To do', 'In progress', 'Done' ];
	return (
		<div className="container px-5 py-2 mx-auto">
			<div className="flex flex-col text-center w-full mb-4">
				<p className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Create issue</p>
			</div>
			<div className="lg:w-2/3 md:w-2/3 mx-auto">
				<div className="flex flex-wrap -m-2">
					<div className="p-2 w-4/6">
						<CustomLabel labelFor="title">Title</CustomLabel>
						<IssueFormsInput
							placeholder="Title"
							type="text"
							name="title"
							//value={}
						/>
					</div>
					<div className="p-2 w-2/6">
						<CustomLabel labelFor="storyPoints">Story Points</CustomLabel>
						<IssueFormsInput
							placeholder="Points"
							type="number"
							name="storyPoints"
							//value={}
						/>
					</div>
					<div className="p-2 w-full">
						<textarea
							className="w-full bg-gray-100 rounded border border-gray-400 focus:outline-none h-24 focus:border-teal-500 text-base px-4 py-2 resize-none block"
							placeholder="Description"
						/>
					</div>
					<div className="p-2 w-full">
						<div className="flex flex-wrap -mx-3 mb-2">
							<CustomSelect options={types}>
								<CustomLabel> Type</CustomLabel>
							</CustomSelect>
							<CustomSelect options={priorities}>
								<CustomLabel>Priority</CustomLabel>
							</CustomSelect>
							<CustomSelect options={statuses}>
								<CustomLabel>Status</CustomLabel>
							</CustomSelect>
						</div>
					</div>
					<div className="p-2 w-full">
						<button className="flex mx-auto text-white bg-green-400 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">
							Button
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateIssueForm;
