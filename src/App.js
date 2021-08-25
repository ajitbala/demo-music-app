
import React, { useEffect, useState } from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AlbumView from './components/AlbumView';
import HeaderView from './components/HeaderView';
import LikedAlbumView from './components/LikedAlbumView';
import PlayListView from './components/PlayListView';

//main view to display all components with routing

function App() {

  let [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(currState => !currState)
  }
   
  return (
    <React.Fragment>
      <HeaderView showMenu={() => toggleMenu()}></HeaderView>
      <Router>
      <div className="container-fluid">
        <div className="row">
          <nav id="sidebarMenu" className={showMenu ? "col-md-3 col-lg-2 d-md-block bg-light sidebar collapse show" : "col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"}>
            <div className="position-sticky pt-3">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link className="nav-link active" to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-home" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                    Home
                  </Link>

                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/favourites">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="feather bi bi-suit-heart-fill" viewBox="0 0 16 16">
                    <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/>
                  </svg>
                    Liked Songs
                  </Link>

                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/playlist"> 
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="feather bi bi-list" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                  </svg>
                    Playlist
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          <Switch>
            <Route path="/playlist" render={() => <PlayListView hideMenu={() => setShowMenu(false)}/>} />
            <Route path="/favourites" render={() => <LikedAlbumView hideMenu={() => setShowMenu(false)}/>} />
            <Route path="/" render={() => <AlbumView pageTitle="Home" hideMenu={() => setShowMenu(false)}/>} />
          </Switch>

          
        </div>
      </div>
      </Router>
      
      

    </React.Fragment>
    
  );
}

export default App;
