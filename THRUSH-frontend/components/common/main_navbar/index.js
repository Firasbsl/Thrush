import { useRouter } from "next/router";
import NavLinks from "../navigation_links";


export default function Navbar() {
  const { pathname } = useRouter();

  return (
    <div className="flex z-index m-0 p-0 bg-black">
      <NavLinks/>
    </div>
  );
}
