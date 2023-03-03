import { useRouter } from "next/router";
import { useEffect } from "react";

function useAllowSameUrlNavigation() {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (router.asPath === url) {
        // Allow navigation to the same URL
        router.replace(url);
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);
}

export default useAllowSameUrlNavigation;
