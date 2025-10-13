import { defineQuery, PortableText } from "next-sanity";
import { sanityFetch } from "@/sanity/live";
import { urlFor } from "@/sanity/image";
import { notFound } from "next/navigation";

const BLOG_QUERY = defineQuery(`*[
    _type == "blogPost" &&
    slug.current == $slug
  ][0]{
  title,
}`);

export default async function blogPage(
    {
        params,
    }: {
        params: Promise<{ slug: string }>;
    }
) {
    const { data: blogPost } = await sanityFetch({
        query: BLOG_QUERY,
        params: await params,
    });
    if (!blogPost) {
        notFound();
    }
    const {
        title,
    } = blogPost;

    return (
        <div>
            <h1>
                Title is {title}.
            </h1>
        </div>
    );

}