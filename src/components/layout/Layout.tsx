import { Outlet } from "react-router-dom";
import NavBar from "../navbar/NavBar";

const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};
export default Layout;
