import { defineQuery, PortableText } from "next-sanity";
import { sanityFetch } from "@/sanity/live";
import { urlFor } from "@/sanity/image";
import { notFound } from "next/navigation";

const BLOG_QUERY = defineQuery(`*[
    _type == "blogPost" &&
    slug.current == $slug
  ][0]{
  title,
  details
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
        details,
    } = blogPost;

    console.log(`Details: ${JSON.stringify(details, null, 2)}`);

    return (
        <div>
            <h1>
                Title is {title}.
            </h1>
            <PortableText value={details ?? []} />
        </div>
    );

}