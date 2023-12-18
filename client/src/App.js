import './App.css';

import {BrowserRouter,Routes,Route,} from 'react-router-dom'
import { Home } from './pages/home';
import { Profile } from './pages/profile';
import {History}from './pages/history';
import {Completed}from './pages/completed';



function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Routes>
          <Route path='/' element = {<Home/>}/>
          <Route path='/profile' element = {<Profile />}/>
          <Route path='/history' element={<History/>} />
          <Route path='/completed' element={<Completed/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
