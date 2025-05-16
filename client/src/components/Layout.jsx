import Footer from "./Footer";
import Menu from "./Menu";

const Layout = ({ children }) => {
  return (
    <>
      <Menu />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
