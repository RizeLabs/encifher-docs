import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
// import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from "@theme/Heading";

import styles from "./index.module.css";

function HomepageHeader() {
  const addEncifherNetworkConfig = async () => {
    try {
      if ((window as any).ethereum) {
        await (window as any).ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0xdea89",
              chainName: "Encifher",
              rpcUrls: ["https://rpc.encifher.io"],
              iconUrls: [
                "https://encifher.io/enc.svg",
                "https://encifher.io/enc.png",
              ],
              nativeCurrency: {
                name: "ENCIFHER",
                symbol: "ENC",
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
    <header className={clsx(styles.heroBanner)}>
      <div className={styles.herowrap}></div>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttonContainer}>
          {" "}
          <div className={styles.buttons}>
            <Link
              to="/docs/intro"
              style={{color: "white", textDecoration:"none", fontWeight: 650}}
            >
              Head over to documentation
            </Link>
          </div>
          <div className={styles.buttons}>
            <button
              onClick={() => addEncifherNetworkConfig()}
              style={{background: "transparent", border: 0, fontSize: "medium", fontWeight: 1000}}
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
    <Layout
      title={`Docs`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
    </Layout>
  );
}
