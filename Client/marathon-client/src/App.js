import React from 'react';
import './styles/main.css';
import Main from './components/main/main.component';
import Navigation from './components/navigation/navigation.component';

function App() {
	return (
		<div>
			<Navigation />
			<Main />
		</div>
	);
}

export default App;
