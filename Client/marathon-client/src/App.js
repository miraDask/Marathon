import React from 'react';
import './styles/main.css';
import Main from './components/main/main.component';
import Navigation from './components/navigation/navigation.component';
import Footer from './components/footer/footer.component';
function App() {
	return (
		<div>
			<Navigation />
			<Main />
			<Footer />
		</div>
	);
}

export default App;
