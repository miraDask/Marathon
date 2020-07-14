import React from 'react';
import { useLocation } from 'react-router-dom';
import './styles/main.css';

import Main from './components/main/main.component';
import Navigation from './components/navigation/navigation.component';
import Footer from './components/footer/footer.component';
import DashboardNavBar from './components/navigation/dashboard-navbar.component';
import ProjectsContextProvider from '../src/providers/projects-context.provider';
import IssuesContextProvider from '../src/providers/issues-context.provider';

const App = () => {
	const isDashboardPathActive = useLocation().pathname.includes('user/dashboard');
	return (
		<div>
			<ProjectsContextProvider>
				<Navigation />
				{isDashboardPathActive ? <DashboardNavBar otherClasses="w-full" /> : null}
				<IssuesContextProvider>
					<Main />
				</IssuesContextProvider>
				<Footer />
			</ProjectsContextProvider>
		</div>
	);
};

export default App;
