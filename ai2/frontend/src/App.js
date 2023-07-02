import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import CreateFilme from './view/criarFilme';
import ListFilme from './view/listarFilme';
import UpdateFilme from './view/updateFilme';
import ListGenero from './view/listarGenero';
import UpdateGenero from './view/updateGenero';
import CreateGenero from './view/criarGenero';




function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className='navbar-brand' to='/filme/list'>Os meus filmes</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/filme/list">Filmes</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/filme/create">Adicionar filme</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/genero/list">Generos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/genero/create">Adicionar genero</Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container py-4">
          <div className="row">
            <Routes>
              <Route path="/filme/list" element={<ListFilme />} />
              <Route path="/filme/create" element={<CreateFilme />} />
              <Route path="/filme/update/:id" element={<UpdateFilme />} />
              <Route path="/filme/delete/:id" />
              <Route path="/genero/list" element={<ListGenero />} />
              <Route path="/genero/update/:id" element={<UpdateGenero />} />
              <Route path="/genero/create" element={<CreateGenero />} />
              <Route path="/genero/delete/:id" />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;