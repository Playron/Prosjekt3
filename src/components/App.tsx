import React,{useEffect} from 'react';
import SearchScreen from './SearchScreen';
import LoginScreen from './LoginScreen';
import ThemeSwapper from './ThemeSwapper';
import TitleCard from './TitleCard';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


export default function App() {
  useEffect(() => {
    document.title = "Movie App";
  }, [])
  
  return (
      <div className="App">
        <ThemeSwapper />
        <TitleCard />
        <SearchScreen />
      </div>
  );
}
