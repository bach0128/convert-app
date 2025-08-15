import {
  SidebarContent,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/Shadcn/sidebar';
import { AppSidebar } from '@/components/BaseComponents/AppSideBar';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      {/* <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"></header> */}
      <SidebarContent className="px-4 py-6 max-w-full rounded-xl shadow">
        <SidebarTrigger className="-ml-1" />
        <Outlet />
      </SidebarContent>
    </SidebarProvider>
  );
}
