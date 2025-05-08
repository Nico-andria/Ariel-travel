import Routers from "../routers/Routers";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Menu from "./Menu";

const Layout = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Menu />
      <Routers />
      <Footer />
    </>
  );
};

export default Layout;
