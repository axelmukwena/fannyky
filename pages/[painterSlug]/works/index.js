import { useEffect } from "react";
import { useRouter } from "next/router";
import Loading from "../../../components/Loading/Loading";

const Index = function Index() {
  const router = useRouter();

  useEffect(() => {
    const newPath = router.asPath.replace("/works", "");
    router.replace(newPath);
  }, [router.asPath]);

  return <Loading />;
};

export default Index;
