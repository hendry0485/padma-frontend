// import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';

function Home() {
  return (
    <header className="App-header">
      <h3>Welcome</h3> 
      <NavLink className='col-4 d-grid p-1' to="/login" >    
        LOGIN
      </NavLink>
    </header>
  );
}

export default Home;
