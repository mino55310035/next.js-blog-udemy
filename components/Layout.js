import Head from "next/head";
import styles from "./layout.module.css"
import utilStyles from "../src/styles/utils.module.css"
import Link from "next/link";

const name = "Mino Code";
export const siteTitle = "Next.js blog";

function Layout({ children, home} ) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icom" href="/favicon.ico"></link>
            </Head>
            <header className={styles.header}>
                {home ? (
                    <>
                    <img src="/images/profile (1).png" className={`${utilStyles.borderCircle} ${styles.headerHomeImage}`} />
                    <h1 className={utilStyles.heading2Xl}>{name}</h1>
                    </>
                ) : (
                    <>
                    <img src="/images/profile (1).png" className={`${utilStyles.borderCircle}`} />
                    <h1 className={utilStyles.heading2Xl}>{name}</h1>
                    </>
                )}
                
            </header>
            <main>{children}</main>
            {!home &&(
                <div>
                    <Link href="/">←ホームへ戻る</Link>
                </div>
            )}
        </div>
    );
}

export default Layout;