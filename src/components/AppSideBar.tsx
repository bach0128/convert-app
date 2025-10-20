'use client';
import { UserCircle2, PanelRight, ChevronDown } from 'lucide-react';
import logo from '@/assets/images/logo.jpg';
import { NavList } from '@/enum/NavList';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from './Shadcn/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { cn } from '@/lib/utils';
import { Button } from './Shadcn/button';
import React from 'react';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/Shadcn/collapsible';
import { ROLE_USER } from '@/enum/Status';
import { TabID } from '@/types/nav';

export function Sidebar({
  isOpenSidebar,
  setIsOpenSidebar,
}: {
  isOpenSidebar: boolean;
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { user, logout } = useAuth();

  return (
    <div
      className={cn(
        `inset-y-0 relative bg-[#F8F8F8] z-10 top-0 left-0 flex flex-col transition-all duration-300 ease-in-out  max-w-(--width-side-bar) px-3 truncate py-6`,
        isOpenSidebar ? 'w-[240px]' : 'w-[70px] px-4 items-center'
      )}
    >
      <div className="flex justify-between items-center">
        <img
          src={logo}
          alt="logo"
          className={cn(
            `transition-all ease-in-out auto w-10 h-10`,
            isOpenSidebar ? '' : 'w-0'
          )}
        />
        <Button
          className="bg-transparent text-black hover:bg-stone-200 rounded-md border-transparent shadow-none p-2 cursor-pointer"
          onClick={() => setIsOpenSidebar(!isOpenSidebar)}
        >
          <PanelRight />
        </Button>
      </div>
      <div
        className={cn(`flex flex-col mt-3`, isOpenSidebar ? 'gap-1' : 'gap-2')}
      >
        {NavList.map((item) => {
          if (item.items && item.items.length > 0) {
            return (
              <Collapsible key={item.title}>
                <CollapsibleTrigger
                  asChild
                  className={cn(
                    'flex cursor-pointer select-none items-center',
                    isOpenSidebar
                      ? 'gap-0.5 pl-1.5'
                      : 'flex-col items-center gap-0',
                    'hover:bg-yellow-base hover:rounded'
                  )}
                >
                  <div>
                    <div
                      className={cn(
                        'w-10 h-10 rounded flex items-center justify-center',
                        'bg-none'
                      )}
                    >
                      {item.icon &&
                        React.createElement(item.icon, { size: 20 })}
                    </div>
                    <p
                      className={cn(
                        'font-medium w-full text-start inline-flex items-center transition duration-100',
                        isOpenSidebar ? '' : 'hidden'
                      )}
                    >
                      {item.title} <ChevronDown size={18} />
                    </p>
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div
                    className={cn(
                      'ml-8 flex flex-col',
                      isOpenSidebar ? 'gap-1' : 'gap-0'
                    )}
                  >
                    {item.items.map((subItem) => (
                      <NavLink
                        to={subItem.url}
                        end
                        key={subItem.title}
                        className={({ isActive }) =>
                          cn(
                            'flex items-center gap-1 hover:bg-yellow-base hover:rounded px-2',
                            isActive ? 'bg-yellow-base rounded' : ''
                          )
                        }
                      >
                        <div
                          className={cn(
                            'w-6 h-6 rounded flex items-center justify-center',
                            'text-[14px]',
                            'text-black',
                            'bg-none'
                          )}
                        >
                          {subItem.icon &&
                            React.createElement(subItem.icon, { size: 16 })}
                        </div>
                        <p
                          className={cn(
                            'font-medium transition duration-100',
                            !isOpenSidebar && 'hidden'
                          )}
                        >
                          {subItem.title}
                        </p>
                      </NavLink>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            );
          }

          return (
            <NavLink
              to={
                item.url === TabID.BUSINESS_HOUSEHOLD
                  ? user?.role === ROLE_USER.user
                    ? `${item.url}/${user.id}`
                    : item.url
                  : item.url
              }
              end
              key={item.title}
              className={() => cn('hover:bg-yellow-base hover:rounded')}
            >
              {({ isActive }) => (
                <div
                  className={cn(
                    'flex text-center items-center w-full',
                    isOpenSidebar
                      ? 'gap-0.5 pl-1.5'
                      : 'flex-col items-center gap-0',
                    isActive
                      ? isOpenSidebar
                        ? 'bg-yellow-base rounded'
                        : 'bg-none'
                      : ''
                  )}
                >
                  <div
                    className={cn(
                      'w-10 h-10 rounded flex items-center justify-center',
                      isActive ? 'bg-yellow-base' : 'bg-none'
                    )}
                  >
                    {item.icon && React.createElement(item.icon, { size: 20 })}
                  </div>
                  <p
                    className={cn(
                      'font-medium w-full text-start transition duration-100',
                      isOpenSidebar ? '' : 'hidden',
                      !isOpenSidebar && isActive ? 'text-black' : ''
                    )}
                  >
                    {item.title}
                  </p>
                </div>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* <div
        className={cn(
          `overflow-auto flex-1 mt-14`,
          isOpenSidebar ? '' : 'opacity-0'
        )}
      >
        <Outlet />
      </div> */}

      <div className="flex items-end truncate mt-6 gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full cursor-pointer flex items-center gap-2 hover:bg-yellow-base rounded-sm p-1">
            <UserCircle2 size={18} />
            <span className={cn(isOpenSidebar ? '' : 'hidden')}>
              {user?.name}
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px]">
            <DropdownMenuItem onClick={() => logout()}>
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
