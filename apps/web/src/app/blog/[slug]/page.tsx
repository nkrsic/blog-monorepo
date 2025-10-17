import { defineQuery, PortableText } from "next-sanity";
import { sanityFetch } from "@/sanity/live";
import { urlFor } from "@/sanity/image";
import { notFound } from "next/navigation";
import Image from "next/image";
import katex from "katex";
import "katex/dist/katex.min.css";
import MathBlock from "../../../components/MathBlock";

const BLOG_QUERY = defineQuery(`*[
    _type == "blogPost" &&
    slug.current == $slug
  ][0]{
  title,
  details,
  image,
  headline->
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
        headline,
        image,
    } = blogPost;

    const imageUrl = image
        ? urlFor(image)
            .width(1200)
            .quality(80)
            .auto("format")
            .url()
        : "https://placehold.co/550x310/png";

    console.log(`Details: ${JSON.stringify(details, null, 2)}`);

    // A small helper component for rendering KaTeX math
    // const MathBlock = ({ value, inline = false }: { value: string; inline?: boolean }) => {
    //     if (!value) return null;
    //     const html = katex.renderToString(value, {
    //         throwOnError: false,
    //         displayMode: !inline,
    //     });
    //     return (
    //         <span
    //             className={inline ? "inline-block" : "block my-4"}
    //             dangerouslySetInnerHTML={{ __html: html }}
    //         />
    //     );
    // };

    return (
        <div>
            <div className="flex flex-col items-center px-4 sm:px-8 lg:px-8">
                <div className="prose lg:prose-lg sm:prose-sm max-w-2xl mx-auto my-10 sm:px-6">
                    <h1 className="font-bold">
                        {title}
                    </h1>
                    <div className="relative w-full aspect-square overflow-hidden rounded-xl">
                        <Image
                            src={imageUrl}
                            alt={"Event"}
                            className="mt-0 mb-0 object-cover object-center rounded-xl"
                            fill
                            sizes="100vw"
                        />
                    </div>
                    <PortableText
                        value={details ?? []}
                        components={{
                            block: {
                                normal: ({ children }) => <p>{children}</p>,
                                h1: ({ children }) => <h1>{children}</h1>,
                            },
                            list: {
                                bullet: ({ children }) => <ul className="list-disc pl-6 my-2">{children}</ul>,
                                number: ({ children }) => <ol>{children}</ol>,
                            },
                            listItem: {
                                bullet: ({ children }) => <li className="mb-1">{children}</li>,
                                number: ({ children }) => <li>{children}</li>,
                            },
                            marks: {
                                strong: ({ children }) => <strong>{children}</strong>,
                                em: ({ children }) => <em>{children}</em>,
                                // 👇 Added inline code styling
                                code: ({ children }) => (
                                    <code className="bg-gray-200 rounded px-1 py-0.5 font-mono text-sm whitespace-pre-wrap">
                                        {children}
                                    </code>
                                ),
                            },
                            // 👇 Added block-level code rendering
                            types: {
                                code: ({ value }) => (
                                    <pre className="
                                    whitespace-pre-wrap sm:whitespace-pre break-words bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4 text-sm leading-relaxed">
                                        <code>{value.code}</code>
                                    </pre>
                                ),
                                latex: ({ value }) => (
                                    <MathBlock value={value?.body || value} inline={false} />
                                ),
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );

}