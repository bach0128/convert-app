import type * as React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/Shadcn/dropdown-menu';
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
                          {/* Hide title when collapsed */}
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

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=close]:hover:bg-transparent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <img
                    src={NavList.user.avatar || '/placeholder.svg'}
                    alt={NavList.user.name}
                    className="size-8 rounded-lg"
                  />
                  <div className="ml-2 flex-1 text-left text-sm leading-tight hidden lg:grid group-data-[collapsed=false]/sidebar:grid">
                    <span className="truncate font-semibold">
                      {NavList.user.name}
                    </span>
                    <span className="truncate text-xs">
                      {NavList.user.email}
                    </span>
                  </div>
                  <ChevronUp className="ml-auto size-4 hidden lg:block group-data-[collapsed=false]/sidebar:block" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="top"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
