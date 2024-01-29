import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

function Signin({ providers }) {

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [router, session]);

  return (


  <div className="flex h-screen flex-col items-center space-y-8 pt-40">
    {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
              className="rounded-full
              border border-transparent
              bg-[#fc7405] py-4 px-6 text-xs font-bold uppercase
              tracking-wider
              text-white transition duration-300 ease-out
              hover:scale-105 hover:bg-[#fc810f] md:text-base"

              onClick={() => signIn(provider.id)}
          >
            Link your spotify to thrush
          </button>
        </div>
    ))}
  </div>



  );
}

export default Signin;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
