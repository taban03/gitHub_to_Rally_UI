import React from 'react';
import './App.css';
import { IncorporationForm } from '../Form/Form'
import { Header } from "../Header/Header";
function App() {
  return (
    <div className="App">
        <Header></Header>
       <IncorporationForm></IncorporationForm>
    </div>
  );
}

export default App;
