import React from "react";
import Content from "../components/common/content";
import { useRouter } from "next/router";
import { BaseLayout } from "../components/common/layout";

export default function Index() {
  const router = useRouter();
  /*
  if (userService.userValue?.user.role == "admin") {
    router.push("/dashboard");
  }
  */
  return (
      <div>
        <Content />
      </div>
  );
}

Index.Layout = BaseLayout;
