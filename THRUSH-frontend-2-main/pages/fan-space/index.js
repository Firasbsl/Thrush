import { getProviders, getSession, useSession } from "next-auth/react";
import { modalState } from "../../atoms/modalAtom";
import { useRecoilState } from "recoil";
import Feed from "../../components/MusicStreaming/Feed";
import Modal from "../../components/MusicStreaming/Modal";
import Login from "../../components/MusicStreaming/Login";
import {BaseLayout} from "../../components/common/layout";
 

export default function FanSpace({ trendingResults, followResults, providers }) {
  const { data: session } = useSession();
  const [isOpen] = useRecoilState(modalState);

  if (!session) return <Login providers={providers} />;

  return (
    <div className="">
      <main className="flex mx-auto">
        <Feed />
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

FanSpace.Layout = BaseLayout;
