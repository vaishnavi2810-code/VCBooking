import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './Booking.css'
import React from "react"
import { 
    Outlet } from "react-router-dom"
const Layout3 = () => {

  const handleLogout = () => {
    window.location.replace('http://localhost:3000/adminLogin');
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark ">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <span className="nav-link active"><b>DRDO VC Booking</b></span>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="mybooking">My Bookings</Link>
              </li> */}
              <li className="nav-item dropdown">                
                  <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                      <a href="app.css" className="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Welcome, Admin
                      </a>
                      <ul className="dropdown-menu" aria-labelledby="navbarDarkDropdownMenuLink">
                        <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                      </ul>
                    </li>
                  </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
      <Outlet />
    </>
  )
}

export default Layout3;