import {
  ChartBarIcon,
  ClockIcon,
  DotsHorizontalIcon,
  HomeIcon,
} from "@heroicons/react/solid";
import { FaMicrophoneAlt } from "react-icons/fa";
import { RiCompassFill } from "react-icons/ri";
import Image from "next/image";

function Sidebar() {
  return (
    <section className="fixed top-0 z-40 sm:flex flex-col p-4 items-center w-[90px] h-screen space-y-8">
                     
      <Image
          src="/public/vercel.svg"
          height={250}
          width={600}
          objectFit="contain"
          className="animate-pulse"
      />
      <div className="flex flex-col space-y-8">
        <HomeIcon className="sidebarIcon text-white opacity-[0.85]" />
        <RiCompassFill className="sidebarIcon text-white text-2xl" />
        <FaMicrophoneAlt className="sidebarIcon text-white ml-1" />
        <ChartBarIcon className="sidebarIcon text-white" />
        <ClockIcon className="sidebarIcon text-white" />
        <DotsHorizontalIcon className="sidebarIcon text-white" />
      </div>
    </section>
  );
}

export default Sidebar;
