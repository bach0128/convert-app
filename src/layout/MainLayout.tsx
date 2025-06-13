import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="h-screen w-full">
      <Header />
      <div
        style={{
          height: `calc(100vh - var(--height-header) - var(--height-footer))`,
        }}
        className="overflow-auto"
      >
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
