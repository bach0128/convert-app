import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/Shadcn/sidebar';
import { AppSidebar } from './SideBar';
import { useEffect, useState } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/Shadcn/tabs';
import { NavList, TabComponents } from '@/enum/NavList';
import { X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/enum/route-path';
import { useIsMobile } from '@/hooks/use-mobile';

function MobileSidebarTrigger() {
  const { isMobile, openMobile, setOpenMobile } = useSidebar();
  const customIsMobile = useIsMobile();

  if (!isMobile && !customIsMobile) {
    return <SidebarTrigger />;
  }

  return (
    <p onClick={() => setOpenMobile(!openMobile)}>
      <SidebarTrigger className="-ml-1" />
    </p>
  );
}

function MainLayout() {
  const [openTabs, setOpenTabs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>();
  const navigate = useNavigate();
  const location = useLocation();
  // Sync active tab with current route
  useEffect(() => {
    const currentPath = location.pathname.slice(1);
    if (openTabs.includes(currentPath)) {
      setActiveTab(currentPath);
    }
  }, [location.pathname, openTabs]);

  const handleTabClick = (tabId: string) => {
    if (!openTabs.includes(tabId)) {
      setOpenTabs([...openTabs, tabId]);
    }

    setActiveTab(tabId);
    navigate(`/${tabId === ROUTE_PATH.HOME ? '' : tabId}`);
  };

  const handleCloseTab = (tabId: string) => {
    const newTabs = openTabs.filter((id) => id !== tabId);
    setOpenTabs(newTabs);

    if (activeTab === tabId) {
      setActiveTab(newTabs[newTabs.length - 1] || '');
    }
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    navigate(`/${tabId}`);
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
                <MobileSidebarTrigger />
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0 min-w-0">
              <TabsList className="w-full flex items-start overflow-auto min-w-0">
                <div>
                  {openTabs.map((tabId) => {
                    const tab = NavList.navMain.find((t) => t.url === tabId);
                    if (!tab) return null;
                    return (
                      <TabsTrigger
                        key={tab.url}
                        value={tab.url}
                        className="relative pr-8 w-fit max-w-full rounded-t-md rounded-b-none pb-5 border border-r-stone-200 hover:bg-chart-4"
                        onClick={() => handleTabChange(tab.url)}
                      >
                        <div className="relative top-2">
                          {tab.title}
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCloseTab(tab.url);
                            }}
                            className="absolute -right-6 self-center cursor-pointer hover:text-chart-5"
                          >
                            <X size={12} />
                          </span>
                        </div>
                      </TabsTrigger>
                    );
                  })}
                </div>
              </TabsList>
              {openTabs.map((tabId) => {
                const tab = NavList.navMain.find((t) => t.url === tabId);
                const TabComponent = TabComponents[tabId];

                if (!tab || !TabComponent) return null;

                const hasSubItems = tab.items && tab.items.length > 0;

                return (
                  <TabsContent key={tab.url} value={tab.url} className="mt-.5">
                    <div className="border p-4 rounded bg-white shadow flex-1 h-full">
                      {hasSubItems ? (
                        <div className="space-y-4">
                          <Tabs
                            defaultValue={tab.items[0]?.url}
                            className="w-full"
                          >
                            <TabsList
                              className="grid w-full"
                              style={{
                                gridTemplateColumns: `repeat(${tab.items.length}, 1fr)`,
                              }}
                            >
                              {tab.items.map((subItem) => (
                                <TabsTrigger
                                  key={subItem.url}
                                  value={subItem.url}
                                >
                                  {subItem.title}
                                </TabsTrigger>
                              ))}
                            </TabsList>
                            {tab.items.map((subItem) => {
                              const SubTabComponent =
                                TabComponents[subItem.url];

                              return (
                                <TabsContent
                                  key={subItem.url}
                                  value={subItem.url}
                                  className="mt-4"
                                >
                                  {SubTabComponent ? (
                                    <SubTabComponent />
                                  ) : (
                                    <div className="p-8 text-center text-muted-foreground border-2 border-dashed rounded-lg">
                                      <p>Content for {subItem.title}</p>
                                      <p className="text-sm mt-2">
                                        Component not found: {subItem.url}
                                      </p>
                                    </div>
                                  )}
                                  <TabComponent />
                                </TabsContent>
                              );
                            })}
                          </Tabs>
                        </div>
                      ) : TabComponent ? (
                        <TabComponent />
                      ) : (
                        <div className="p-8 text-center text-muted-foreground border-2 border-dashed rounded-lg">
                          <p>Content for {tab.title}</p>
                          <p className="text-sm mt-2">
                            Component not found: {tabId}
                          </p>
                        </div>
                      )}
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
