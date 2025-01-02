import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
// import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from "@theme/Heading";
import { Redirect } from "@docusaurus/router";

import styles from "./index.module.css";

function HomepageHeader() {
  const addEncifherNetworkConfig = async () => {
    try {
      if ((window as any).ethereum) {
        await (window as any).ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x2328",
              chainName: "Encifher",
              rpcUrls: ["https://rpc.encifher.io"],
              iconUrls: [
                "https://encifher.io/enc.svg",
                "https://encifher.io/enc.png",
              ],
              nativeCurrency: {
                name: "enc Bitcoin",
                symbol: "ebtc",
                decimals: 18,
              },
              blockExplorerUrls: ["https://explorer.encifher.io"],
            },
          ],
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx(styles.heroBanner)} >
      <div className="container" style={{display:"flex", flexDirection: "column", justifyContent:"center", alignItems: "center"}}>
        <Heading as="h1" className="hero__title" style={{fontFamily: "Menseal", textTransform: "uppercase", fontSize: "80px"}}>
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttonContainer}>
          <div className={styles.buttons}>
            <Link
              to="/docs/intro"
              style={{color: "white", textDecoration:"none", fontWeight: 400}}
            >
              Head over to documentation
            </Link>
          </div>
          <div className={styles.buttons}>
            <button
              onClick={() => addEncifherNetworkConfig()}
              style={{color: "white", background: "transparent", border: 0, fontSize: "medium", fontWeight: 400}}
            >
              Add Encifher to Metamask
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    // <Layout
    //   title={`Docs`}
    //   description="Description will go into a meta tag in <head />"
    // >
    //   <HomepageHeader />
    // </Layout>
    <Redirect to="/docs/intro" />
  );
}
