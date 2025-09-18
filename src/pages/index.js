import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../../components/Layout";
import utilStyle from "@/styles/utils.module.css";  // パス修正
import styles from "@/styles/Home.module.css";
import { getAllPostsData } from "../../lib/post";  // 正しい関数名

export async function getStaticProps() {
    const allPostsData = getAllPostsData();  // await削除（同期関数）
    
    return {
        props: {
            allPostsData,
        },
    };
}

export default function Home({ allPostsData }) {
    return (
        <Layout home>
          <Head>
            <title>{siteTitle}</title>
          </Head>
            <section className={utilStyle.headingMd}>
                <p>私はフルスタックエンジニアです/web系エンジニア一年目/自社開発企業に勤務</p>
            </section>
            <section>
                <h2>エンジニアのブログ</h2>
                <div className={styles.grid}>
                    {allPostsData.map(({ id, title, date, thumbnail }) => (
                        <article key={id}>
                            <Link href={`/posts/${id}`}>
                                <img 
                                    src={`${thumbnail}`}
                                    className={styles.thumbnailImage}
                                    alt={title}
                                />
                            </Link>
                            <Link href={`/posts/${id}`} className={utilStyle.boldText}>
                                {title}
                            </Link>
                            <br />
                            <small className={utilStyle.lightText}>{date}</small>
                        </article>
                    ))}
                </div>
            </section>
        </Layout>
    );
}
