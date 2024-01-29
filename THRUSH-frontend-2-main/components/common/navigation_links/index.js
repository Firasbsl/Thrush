import { useRouter } from "next/router";
import { ActiveLink } from "components/common";
import Image from "next/image";
import thrushLogo from "public/Thrush.png";
import { signOut, useSession } from "next-auth/react";
import { LogoutIcon } from "@heroicons/react/outline";
import { userService } from "services";
import React, { useState, useRef, useEffect } from "react";

const style = {
  logoContainer: `flex items-center cursor-pointer`,
  logoText: ` ml-[0.8rem] text-[#FD7F2C] font-semibold text-2xl`,
  headerWrap: ` z-500 relative bg-black pt-1 pb-0.5 flex items-center justify-center space-x-12`,
  headerItems: ` flex items-center justify-center space-x-12`,
  headerItem: `text-white font-bold text-white hover:text-[#8a939b] px-4 space-x-8 cursor-pointer p-1`,
  dropElem: `border-solid cursor-pointer block px-4 py-2 text-white font-semibold hover:bg-[#ffaa54]`,
  dropdowMenu: undefined,
};

export default function NavLinks() {
  const { pathname } = useRouter();
  const [open, setOpen] = useState(false);
  const dropdown = useRef(null);

  function logout() {
    userService.logout();
  }

  useEffect(() => {
    if (!open) return;
    function handleClick(event) {
      if (dropdown.current && !dropdown.current.contains(event.target)) {
        setOpen(false);
      }
    }
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [open]);

  return (
    <>
      <div className={style.headerWrap}>
        <ActiveLink href="/">
          <div className={style.logoContainer}>
            <Image src={thrushLogo} height={50} width={50} />
          </div>
        </ActiveLink>

        <ActiveLink href="/courses-marketplace">
          <a className={style.headerItem}>Music Course Marketplace</a>
        </ActiveLink>
        <ActiveLink href="/instruments">
          <a className={style.headerItem}>Instruments Marketplace</a>
        </ActiveLink>
        <ActiveLink href="/fan-space">
          <a className={style.headerItem}>Fan Space</a>
        </ActiveLink>
        <ActiveLink href="/music-streaming">
          <a className={style.headerItem}>Music Streaming</a>
        </ActiveLink>

        <ActiveLink href="/nft-marketplace">
          <a className={style.headerItem}>NFT Marketplace</a>
        </ActiveLink>

        <button
          className={style.headerItem}
          onClick={() => signOut({ redirect: false })}
        >
          <LogoutIcon className="mr-2 h-5 w-5" aria-hidden="true" />
          Unlink your spotify
        </button>

        <button className={style.headerItem} onClick={logout}>
          <LogoutIcon className="mr-2 h-5 w-5" aria-hidden="true" />
          Log out
        </button>
      </div>
    </>
  );
}
