"use client";

import katex from "katex";
import "katex/dist/katex.min.css";
import { useMemo } from "react";

export default function MathBlock({
    value,
    inline = false,
}: {
    value: string;
    inline?: boolean;
}) {
    const html = useMemo(() => {
        try {
            return katex.renderToString(value || "", {
                throwOnError: false,
                displayMode: !inline,
            });
        } catch (err) {
            console.error("KaTeX render error:", err);
            return value;
        }
    }, [value, inline]);

    return (
        <span
            className={inline ? "inline-block" : "block my-4"}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}