import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
        {/* <li>
            <Link to="/">Login</Link>
          </li> */}
          {/* <li>
            <Link to="/register">Register</Link>
          </li> */}
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;