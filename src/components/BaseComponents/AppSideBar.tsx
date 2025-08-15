'use client';
import { ChevronRight, Building2, UserCircle2 } from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/Shadcn/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/Shadcn/sidebar';
import { NavList } from '@/enum/NavList';
import { Link, useLocation } from 'react-router-dom';

export function AppSidebar() {
  const { pathname } = useLocation();
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <div className="flex items-center gap-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <Building2 className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">
                Phần mềm kế toán HKD
              </span>
            </div>
          </div>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Chức năng chính</SidebarGroupLabel>
          <SidebarMenu>
            {NavList.map((item) => (
              <Collapsible key={item.url} asChild className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={pathname.includes(item.url)}
                    >
                      {item.icon && <item.icon />}
                      {item.items ? (
                        <>
                          <span className="font-medium">{item.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </>
                      ) : (
                        <Link to={item.url} className="w-full">
                          {item.title}
                        </Link>
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items && (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.url}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={pathname.includes(subItem.url)}
                            >
                              <button className="w-full">
                                <Link
                                  to={subItem.url}
                                  className="w-full text-start"
                                >
                                  {subItem.title}
                                </Link>
                              </button>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
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
            <SidebarMenuButton>
              <UserCircle2 />
              <span>Tài khoản</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
