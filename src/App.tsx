import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Startwars from "./pages/Startwars"

function App() {
  return (
    <div className="App">
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
