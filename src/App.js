import React, { Component } from 'react';
import app from './firebase/firebase';
import {Route} from 'react-router-dom';
import './App.css';
import Routes from './routes/route';
import RegisterAuth from './registerAuthentication/register';

class App extends Component {
  
  render(){
    const ref = app.storage().ref('path/to/image.jpg');
const url =  ref.getDownloadURL();
  return (
    <div className="App">
    <Routes />
    </div>
  );
}
}
export default App;
