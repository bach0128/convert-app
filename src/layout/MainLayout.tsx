import { Sidebar } from '@/components/AppSideBar';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  return (
    <div className="h-screen flex w-full">
      <Sidebar
        isOpenSidebar={isOpenSidebar}
        setIsOpenSidebar={setIsOpenSidebar}
      />
      <div className="flex-1 overflow-auto p-5">
        <Outlet />
      </div>
    </div>
  );
}
