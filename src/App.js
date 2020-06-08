import React from 'react';
import { Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import './App.css';

function App() {
  return (
		<div className='main'>
      <Route path='*' component={Navbar} />
		</div>
	);
}

export default App;
