import { Outlet } from "react-router-dom";
import NavBar from "../Navbar/Navbar";
import SideBar from "../Sidebar/Sidebar";

const MasterLayout = () => {
  return (
    <>
      <NavBar/>
      <div className="d-flex">
        <div >
          <SideBar/>
        </div>
        <div className="w-100">
          <Outlet/>
        </div>
      </div>
    </>
  );
};

export default MasterLayout;
