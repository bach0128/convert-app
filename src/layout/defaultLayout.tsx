import { Outlet } from 'react-router-dom';

function DefaultLayout() {
  return (
    <div className="flex flex-col h-screen max-h-screen">
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
}

export default DefaultLayout;
