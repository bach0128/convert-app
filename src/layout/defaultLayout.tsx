import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function LayoutDefault() {
  return (
    <div className="flex flex-col h-screen max-h-screen">
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default LayoutDefault;
