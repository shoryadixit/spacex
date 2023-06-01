import React from 'react';
import './App.css';
import Banner from './components/Banner';
import SearchForm from './components/SearchForm';
import DataGrid from './components/DataGrid';


function App() {

  return (
    <div className="App">
      <Banner />
      <SearchForm />
      <DataGrid />
    </div>
  );
}

export default App;
