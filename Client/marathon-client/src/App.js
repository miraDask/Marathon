import React from 'react';
import './styles/main.css';

import Main from './components/main/main.component';
import Navigation from './components/navigation/navigation.component';
import Footer from './components/footer/footer.component';
import ProjectsContextProvider from '../src/providers/projects-context.provider';
import IssuesContextProvider from '../src/providers/issues-context.provider';

const App = () => {
	return (
		<div>
			<ProjectsContextProvider>
				<Navigation />
				<IssuesContextProvider>
					<Main />
				</IssuesContextProvider>
				<Footer />
			</ProjectsContextProvider>
		</div>
	);
};

export default App;
