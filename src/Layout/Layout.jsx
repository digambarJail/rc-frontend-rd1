import './Layout.css';

import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {

 return(
  <>
    <div className="layoutContainer ">
        <Navbar/>
        <Outlet/>
    </div>
  </>
 );
};

export default Layout;
