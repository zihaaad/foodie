import {Outlet} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <>
      <Navbar />
      <main className="app">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
