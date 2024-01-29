import Head from "next/head";

import { getProviders, getSession, useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import {MainNavbar} from "../common";
import Sidebar2 from "./Sidebar2";
import Feed from "./Feed";
import Widgets from "./Widgets";
import Modal from "./Modal";
import Login from "./Login";
import { modalState } from "../../atoms/modalAtom";

export default function Home({ trendingResults, followResults, providers }) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);

  if (!session) return <Login providers={providers} />;

  return (
    <div className="">
      <Head>
        <title>Fanspace</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainNavbar/>

      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar2/>
        <Feed />
        <Widgets
          trendingResults={trendingResults}
          followResults={followResults}
        />

        {isOpen && <Modal />}
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV").then(
    (res) => res.json()
  );
  const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then(
    (res) => res.json()
  );
  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
    },
  };
}
