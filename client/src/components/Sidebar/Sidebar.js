import React, { useContext } from 'react';
import { NavLink, withRouter } from "react-router-dom";
import $ from "jquery";
import fire from '../../config/Fire';
import { AuthContext } from '../../context/Auth';
import './Sidebar.css';


const Sidebar = () => {
  const { currentUser } = useContext(AuthContext);
  // var str = !currentUser.email ? "" : currentUser.email;
  // const result = str.split('@')[0];

  // console.log(currentUser);
  const tooglesidebar = () => {
    $('#sidebar').toggleClass('active');
  }


  return (

    <>
      {currentUser ? (
        <nav id="sidebar" className="shadow border mt-3">
          <div className="custom-menu">
            <button type="button" id="sidebarCollapse" onClick={tooglesidebar} className="btn btn-primary d-sm-block"></button>
          </div>
          <div className="user-logo pl-4 pt-3">
            <small>online now</small>
            {/* <h1 style={{ color: "#FFF6DB" }}>{currentUser.displayName}</h1> */}
          </div>
          <hr />

          <ul className="list-unstyled components mb-5">
            <li>
              <NavLink exact to="/home" >Home</NavLink>
            </li>
            <div class="accordion" id="accordionExample">
              <div id="drop-nav-1">
                <li className="drop-nav">
                  <a className="collapsed" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Website Leads
                  </a>
                </li>
              </div>
            </div>
            <li>
              <a onClick={() => fire.auth().signOut()}>Sign Out</a>
            </li>
          </ul>
        </nav>
      ) : (
        <div></div>

      )}
    </>
  );

}


export default withRouter(Sidebar);