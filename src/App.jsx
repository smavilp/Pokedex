import './App.scss';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Pokedex from "./pages/Pokedex";
import Pokemon from "./pages/Pokemon";
import MainLayout from './components/MainLayout';
import ProtectedRoutes from './components/ProtectedRoutes';



function App() {

  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route element={<ProtectedRoutes/>}>
            <Route element={<MainLayout/>}>
            <Route path="/pokedex" element={<Pokedex/>}/>
            <Route path="/pokedex/:id" element={<Pokemon/>}/>
            </Route>
          </Route>

        </Routes>
      </div>
    </HashRouter>
  )
}

export default App
