import type * as React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarRail,
} from '@/components/Shadcn/sidebar';

import { Collapsible } from '@/components/Shadcn/collapsible';
import { NavList } from '@/interfaces/NavList';

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
