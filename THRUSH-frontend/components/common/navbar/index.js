import { useWeb3 } from "components/MusicCourses/providers";
import { useAccount } from "components/MusicCourses/hooks/web3";
import { useRouter } from "next/router";
import {Button} from "components/common";

export default function Navbar() {
  const { connect, isLoading, requireInstall } = useWeb3();
  const { account } = useAccount();
  const { pathname } = useRouter();

  return (
    <section>
          <div className="flex flex-col items-center justify-between xs:flex-row">
              {isLoading ? (
                <Button disabled={true} onClick={connect}>
                  Loading...
                </Button>
              ) : account.data ? (
                <Button hoverable={false} className="cursor-default">
                  Hi there {account.isAdmin && "Admin"}
                </Button>
              ) : requireInstall ? (
                <Button
                  onClick={() =>
                    window.open("https://metamask.io/download.html", "_blank")
                  }
                >
                  Install Metamask
                </Button>
              ) : (
                <Button onClick={connect}>Connect</Button>
              )}
          </div>
      {account.data && !pathname.includes("/courses-marketplace/marketplace") && (
        <div className="flex justify-end pt-1 sm:px-6 lg:px-8">
          <div className="rounded-md bg-orange-600 p-2 text-white">
            {account.data}
          </div>
        </div>
      )}
    </section>
  );
}
