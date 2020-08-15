import React from 'react';
import './styles/main.css';

import RoutesHandler from './components/routesHandler';
import Navigation from './components/navigation';
import Footer from './components/footer';
import ProjectsContextProvider from '../src/providers/projects-context.provider';
import IssuesContextProvider from '../src/providers/issues-context.provider';
import SprintsContextProvider from '../src/providers/sprints-context.provider';
import TeamsContextProvider from '../src/providers/teams-context.provider';
import ErrorBoundary from '../src/components/error-boundary';
const App = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<ProjectsContextProvider>
				<Navigation />
				<IssuesContextProvider>
					<SprintsContextProvider>
						<TeamsContextProvider>
							<ErrorBoundary>
								<RoutesHandler />
							</ErrorBoundary>
						</TeamsContextProvider>
					</SprintsContextProvider>
				</IssuesContextProvider>
				<Footer />
			</ProjectsContextProvider>
		</div>
	);
};

export default App;
