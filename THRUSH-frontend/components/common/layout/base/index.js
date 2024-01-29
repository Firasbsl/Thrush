import { Web3Provider } from "components/MusicCourses/providers";
import { Navbar, Footer, MainNavbar } from "components/common";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { userService } from "services";

export default function BaseLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    // redirect to home if already logged in
    if (userService.userValue) {
      router.push("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Web3Provider>
        <div>
          <MainNavbar />
          <div className="fit">{children}</div>
        </div>
      </Web3Provider>
    </div>
  );
}
