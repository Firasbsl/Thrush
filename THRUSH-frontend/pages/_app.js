import "../styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import { RecoilRoot } from "recoil";
import { ThirdwebWeb3Provider } from "@3rdweb/hooks";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { userService } from "services";
import {CartContext} from "../helpers/Context"
import "react-toastify/dist/ReactToastify.css";

const supportedChainIds = [4]; //Chain ID 4 represents Rinkeby network
const connectors = {
  injected: {}, //web3 connection method used by metamask here
};
const Noop = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [authorized, setAuthorized] = useState(false);

  const Layout = Component.Layout ?? Noop;
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    let isApiSubscribed = true;

    if (isApiSubscribed) {
      // on initial load - run auth check
      authCheck(router.asPath);

      // on route change start - hide page content by setting authorized to false
      const hideContent = () => setAuthorized(false);
      router.events.on("routeChangeStart", hideContent);

      // on route change complete - run auth check
      router.events.on("routeChangeComplete", authCheck);

      // unsubscribe from events in useEffect return function
      return () => {
        router.events.off("routeChangeStart", hideContent);
        router.events.off("routeChangeComplete", authCheck);
      };
    }

    return () => {
      // cancel the subscription
      isApiSubscribed = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in
    setUser(userService.userValue);
    const publicPaths = ["/account/login", "/account/register"];
    const path = url.split("?")[0];
    if (!userService.userValue && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: "/account/login",
        query: { returnUrl: router.asPath },
      });
    } else {
      setAuthorized(true);
    }
  }

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
    <script
        type='module'
        src={'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js'}
        strategy='beforeInteractive'
    />

    <ThirdwebWeb3Provider
      supportedChainIds={supportedChainIds}
      connectors={connectors}
    >
      <SessionProvider>
        <RecoilRoot>
          <Layout>
          <CartContext.Provider value={{cartItems, setCartItems}} >
              <ToastContainer />
              {authorized && <Component {...pageProps} />}
          </CartContext.Provider>
          </Layout>
        </RecoilRoot>
      </SessionProvider>
    </ThirdwebWeb3Provider>
    </>
  );
}

export default MyApp;