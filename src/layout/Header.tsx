import { AlignJustify, Loader2, User, X } from 'lucide-react'
import logo from '@/assets/images/logo.jpg'
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/Shadcn/dropdown-menu";
import { Link, NavLink } from 'react-router-dom'
import { ROUTE_PATH } from '@/enum/RoutePath.ts'
import { Button } from '@/components/Shadcn/button.tsx'
import { useEffect, useId, useState } from 'react'

import clsx from 'clsx'
import { useBreakpoint } from '@/hooks/useBreakpoint.ts'

const NAV_LINK_ARR = [
  {
    name: 'Dashboard',
    href: ROUTE_PATH.DASHBOARD,
  },
  {
    name: 'About',
    href: ROUTE_PATH.ABOUT,
  },
  {
    name: 'Contact',
    href: ROUTE_PATH.CONTACT,
  },
]

function SideBar({
  onClose,
  isLogoutLoading,
  onLogout,
}: {
  onClose: () => void
  isLogoutLoading: boolean
  onLogout: () => void
}) {
  const id = useId()
  const { isGreaterOrEqual } = useBreakpoint(768)
  useEffect(() => {
    if (isGreaterOrEqual) onClose()
  }, [isGreaterOrEqual, onClose])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <div className="inset-0 fixed bg-white z-[9999] top-20">
      <nav className="flex flex-col border-t border-gray-200">
        {NAV_LINK_ARR.map((navItem) => (
          <NavLink
            to={navItem.href}
            className={({ isActive }) =>
              clsx(
                isActive && 'underline',
                'flex items-center font-medium py-3 hover:bg-gray-100 px-10 max-md:px-4'
              )
            }
            key={id + navItem.href}
          >
            {navItem.name}
          </NavLink>
        ))}
      </nav>
      <div className="px-10 max-md:px-4 flex gap-1 border-t border-gray-200 py-3 font-semibold">
        <User /> Account
      </div>
      <Button
        className={`text-base w-full h-fit text-start justify-start py-3 hover:bg-gray-100 bg-white text-black px-10 max-md:px-4 ${
          isLogoutLoading && 'cursor-not-allowed'
        }`}
        disabled={isLogoutLoading}
        onClick={onLogout}
      >
        {isLogoutLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        Logout
      </Button>
    </div>
  )
}

function Header() {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleLogout = async () => {
    setIsLoading(true)
    console.log('Logging out...')
  }

  return (
    <>
      <header
        className="flex justify-between gap-4 px-10 max-md:px-4 py-5 border-b border-[#CECECE]"
        style={{ height: 'var(--height-header)' }}
      >
        <div className="flex gap-6 flex-grow ">
          <Link to={ROUTE_PATH.HOME} className="border border-gray-300 ">
            <img src={logo} alt="Logo" className="h-full" />
          </Link>
        </div>
        <nav className="flex gap-10 max-md:hidden">
          {NAV_LINK_ARR.map((navItem) => {
            return (
              <NavLink
                to={navItem.href}
                className={({ isActive }) =>
                  clsx(isActive && 'underline', 'flex items-center font-medium')
                }
                key={navItem.href}
              >
                {navItem.name}
              </NavLink>
            )
          })}
        </nav>
        <Button
          className="max-md:block hidden bg-transparent text-black border border-gray-300"
          onClick={() => setIsOpenSidebar(!isOpenSidebar)}
        >
          {isOpenSidebar ? <X /> : <AlignJustify />}
        </Button>
      </header>
      {isOpenSidebar && (
        <SideBar
          onClose={() => setIsOpenSidebar(false)}
          isLogoutLoading={isLoading}
          onLogout={handleLogout}
        />
      )}
    </>
  )
}

export default Header
