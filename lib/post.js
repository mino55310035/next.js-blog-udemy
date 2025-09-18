// lib/post.js
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";  // 追加

const postsDirectory = path.join(process.cwd(), "posts");

// ✅ 関数名を getAllPostsData に変更
export function getAllPostsData(){
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName)=>{
        const id = fileName.replace(/\.md$/, "");

        const fullpath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullpath, "utf-8");

        const matterResult = matter(fileContents);

        return {
            id,
            ...matterResult.data,
        };
    });
    return allPostsData;
}

// getStaticPathでreturnで使うpathを取得する
export function getAllPostIds(){
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ""),
            },
        };
    });
}

// ✅ 関数名を getPostData に変更
export async function getPostData(id) {
    const fullpath = path.join(postsDirectory, `${id}.md`);
    const fileContent = fs.readFileSync(fullpath, "utf-8");

    const matterResult = matter(fileContent);

    const blogContent = await remark()
        .use(html)  // ✅ html をインポート済み
        .process(matterResult.content);

    const blogContentHTML = blogContent.toString();

    return {
        id,
        blogContentHTML,
        ...matterResult.data,
    };
}