import type * as React from 'react';
import { ChevronDown } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@/components/Shadcn/sidebar';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/Shadcn/collapsible';
import { NavList } from '@/enum/NavList';

export function AppSidebar({
  onTabClick,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  onTabClick: (tabId: string) => void;
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuSub>Phần mềm kế toán HKD</SidebarMenuSub>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {NavList.navMain.map((item) => (
              <Collapsible
                key={item.title}
                asChild
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  {item.items ? (
                    <>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          tooltip={item.title}
                          size="lg"
                          className="group-data-[collapsible=icon]:justify-center"
                          onClick={() => onTabClick(item.url)}
                        >
                          {item.icon && <item.icon className="self-center" />}
                          <span className="font-medium sidebar-item-text lg:inline group-data-[collapsible=icon]:hidden">
                            {item.title}
                          </span>
                          {item.items && (
                            <ChevronDown className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180 group-data-[collapsible=icon]:hidden" />
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <a href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </>
                  ) : (
                    <SidebarMenuButton
                      tooltip={item.title}
                      size="lg"
                      className="group-data-[collapsible=icon]:justify-center"
                      onClick={() => onTabClick(item.url)}
                    >
                      {item.icon && <item.icon className="self-center" />}
                      {/* Hide title when collapsed */}
                      <span className="font-medium sidebar-item-text lg:inline group-data-[collapsible=icon]:hidden">
                        {item.title}
                      </span>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
