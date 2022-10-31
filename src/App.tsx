import { Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home"
import Startwars from "./pages/Startwars"
import logo from './logo.svg';
import './scss/style.scss';

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
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={ <Home/> } />

        <Route path="/Startwars" element={ <Startwars/> }>
          <Route path=":name" element={<Startwars />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
