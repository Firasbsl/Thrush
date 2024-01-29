import Dashboard from "../../components/MusicStreaming/Dashboard";
import { BaseLayout } from "../../components/common/layout";
import { useRouter } from "next/router";
import { SessionProvider, useSession } from "next-auth/react";
import React from "react";

export default function MusicStreaming() {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/signin");
    },
  });
  if (!session) {
    return <h1>Link your spotify please! :(</h1>;
  }
  return (
    <>
      <Dashboard />
    </>
  );
}

MusicStreaming.Layout = BaseLayout;
