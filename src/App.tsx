import { Routes, Route, Link } from "react-router-dom"

import logo from './logo.svg';
import './scss/style.scss';

import Home from "./pages/Home"
import Startwars from "./pages/Startwars"
import Dashboard from "./pages/Dashboard"

function App() {
  return (
    <div className="App">
      <header>
        <Link to="/">
          <img src={logo} className="logo" alt="logo" />
        </Link>

        <div className="wrapper">
          <nav>
            <Link to="/Startwars">Star wars</Link>
            <Link to="/Dashboard">Dashboard</Link>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/Dashboard" element={ <Dashboard/> } />

        <Route path="/Startwars" element={ <Startwars/> }>
          <Route path=":name" element={<Startwars />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
