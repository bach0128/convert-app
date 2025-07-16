import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/components/Shadcn/breadcrumb';
import { Separator } from '@/components/Shadcn/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/Shadcn/sidebar';
import { AppSidebar } from './SideBar';
import { useState } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/Shadcn/tabs';
import { NavList } from '@/enum/NavList';
import { X } from 'lucide-react';

function MainLayout() {
  const [openTabs, setOpenTabs] = useState<string[]>(['home']);
  const [activeTab, setActiveTab] = useState<string>('home');

  const handleTabClick = (tabId: string) => {
    if (!openTabs.includes(tabId)) {
      setOpenTabs([...openTabs, tabId]);
    }
    setActiveTab(tabId);
  };

  const handleCloseTab = (tabId: string) => {
    const newTabs = openTabs.filter((id) => id !== tabId);
    setOpenTabs(newTabs);

    // Nếu tab đang active bị đóng, chuyển active sang tab trước đó hoặc tab đầu
    if (activeTab === tabId) {
      setActiveTab(newTabs[newTabs.length - 1] || '');
    }
  };

  return (
    <div className="h-screen w-full">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        orientation="vertical"
      >
        <SidebarProvider>
          <AppSidebar onTabClick={handleTabClick} />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">
                        Building Your Application
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              <TabsList className="w-full flex items-start">
                <div>
                  {openTabs.map((tabId) => {
                    const tab = NavList.navMain.find((t) => t.url === tabId);
                    if (!tab) return null;
                    return (
                      <TabsTrigger
                        key={tab.url}
                        value={tab.url}
                        className="relative pr-8 w-fit max-w-full rounded-t-md rounded-b-none pb-5 border border-r-stone-200 hover:bg-chart-4"
                      >
                        <div className="relative top-2">
                          {tab.title}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCloseTab(tab.url);
                            }}
                            className="absolute -right-6 self-center cursor-pointer hover:text-chart-5"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      </TabsTrigger>
                    );
                  })}
                </div>
              </TabsList>
              {openTabs.map((tabId) => {
                const tab = NavList.navMain.find((t) => t.url === tabId);
                if (!tab) return null;
                return (
                  <TabsContent key={tab.url} value={tab.url} className="mt-4">
                    <div className="border p-4 rounded bg-white shadow">
                      {tab.title}
                    </div>
                  </TabsContent>
                );
              })}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </Tabs>
    </div>
  );
}

export default MainLayout;
