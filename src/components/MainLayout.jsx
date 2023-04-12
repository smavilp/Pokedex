import { Outlet } from 'react-router-dom';
import Banner from "../components/Banner";
import Footer from "../components/Footer";

const MainLayaut = () => {
  return (
    <>
      <Banner/>
      <Outlet/>
      {/* <Footer/> */}
    </>
  );
};

export default MainLayaut;