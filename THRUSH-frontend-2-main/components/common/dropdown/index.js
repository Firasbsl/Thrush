/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dropdown() {
  return (
    <>
      {/*
        <div>
          <button
            style={{ color: "white", fontWeight: "bold" }}
            onClick={() => setOpen((open) => !open)}
          >
            NFT Marketplace{" "}
          </button>
          <div>
            {open && (
              <div
                ref={dropdown}
                className="absolute mt-2 w-36 rounded-lg bg-[#FD7F2C] py-1 shadow-xl"
              >
                <Link href="/nft-marketplace" className={style.dropElem}>
                  Homepage
                </Link>
                <hr className="dropdown-divider"/>
                <Link
                  href="https://thirdweb.com/dashboard"
                  className={style.dropElem}
                >
                  Create
                </Link>
                <hr className="dropdown-divider"></hr>
                <Link
                  href="/nft-marketplace/collections/0x660aF8bB64C0D7aC993F786a6D8cD1E03A5C0E06/"
                  className={style.dropElem}
                >
                  Collections
                </Link>
                <hr className="dropdown-divider"></hr>
                <Link
                  href="/nft-marketplace/help-center"
                  className={style.dropElem}
                >
                  Resources
                </Link>
                <hr className="dropdown-divider"></hr>
                <Link href="/nft-marketplace/Reviews" className={style.dropElem}>
                  Reviews
                </Link>
              </div>
            )}
          </div>
        </div>
        */}
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-100 hover:bg-gray-50">
            NFT Marketplace
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  // eslint-disable-next-line @next/next/no-html-link-for-pages
                  <a
                    href="/nft-marketplace"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Homepage
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="https://thirdweb.com/dashboard"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Create
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  // eslint-disable-next-line @next/next/no-html-link-for-pages
                  <a
                    href="/nft-marketplace/collections/0x660aF8bB64C0D7aC993F786a6D8cD1E03A5C0E06/"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Collections
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  // eslint-disable-next-line @next/next/no-html-link-for-pages
                  <a
                    href="/nft-marketplace/help-center"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Resources
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  // eslint-disable-next-line @next/next/no-html-link-for-pages
                  <a
                    href="/nft-marketplace/Reviews"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Reviews
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}
