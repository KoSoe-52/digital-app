import { useState } from 'react'
import {
    Dialog,
    DialogPanel,
    PopoverGroup,
  } from '@headlessui/react'
  import {
    Bars3Icon,
    XMarkIcon,
  } from '@heroicons/react/24/outline'
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate();
  const clearSession = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem('authenticated');
    navigate("/");
  };
  return (
    <header className="bg-dark">
      <nav aria-label="Global" className="mx-auto flex  items-center justify-between p-2 lg:px-8 border-b-2 border-black">
        <div className="flex lg:flex-1">
          <Link to={"#"} className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt=""
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Link to={"/three"} className="text-sm/6 font-semibold ">Home</Link>
          <Link to={"/detail"} className="text-sm/6 font-semibold ">Detail</Link>
          <Link to={"/setting"} className="text-sm/6 font-semibold ">Setting</Link>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a onClick={clearSession} href="#" className="text-sm/6 font-semibold cursor-pointer">
            Logout <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  to={"/three"}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Home
                </Link>
                <Link
                  to={"/detail"}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Detail
                </Link>
                <Link
                  to={"/setting"}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Setting
                </Link>
                <a
                  onClick={clearSession} href='#'
                  className="-mx-3 block roundeds-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Logout
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>          
    </header>
  )
}
