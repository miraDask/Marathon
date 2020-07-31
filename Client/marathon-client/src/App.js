import React from 'react';
import './styles/main.css';

import Main from './components/main/main.component';
import Navigation from './components/navigation/navigation.component';
import Footer from './components/footer/footer.component';
import ProjectsContextProvider from '../src/providers/projects-context.provider';
import IssuesContextProvider from '../src/providers/issues-context.provider';
import SprintsContextProvider from '../src/providers/sprints-context.provider';
import TeamsContextProvider from '../src/providers/teams-context.provider';

const App = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<ProjectsContextProvider>
				<Navigation />
				<IssuesContextProvider>
					<SprintsContextProvider>
						<TeamsContextProvider>
							<Main />
						</TeamsContextProvider>
					</SprintsContextProvider>
				</IssuesContextProvider>
				<Footer />
			</ProjectsContextProvider>
		</div>
	);
};

export default App;
