import React, { useEffect, useState } from "react";
import { Converter } from "showdown";
import DOMPurify from "dompurify";
import { html as beautifyHtml } from "js-beautify";

interface MdConversionProps {}

export function MdConversion(props: MdConversionProps) {
  const filePath = "/test.md";
  const [markdownText, setMarkdownText] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(filePath)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        setMarkdownText(data);
        setError(null);
      })
      .catch(error => {
        console.error("Error fetching markdown:", error);
        setError("Failed to load markdown content");
      });
  }, [filePath]);

  const converter = new Converter();

  const dirtyHtml = converter.makeHtml(markdownText);
  const cleanHtml = DOMPurify.sanitize(dirtyHtml);
  const formattedHtml = beautifyHtml(cleanHtml, {
    indent_size: 2, // Number of spaces for indentation
    preserve_newlines: true, // Preserve existing line breaks
    max_preserve_newlines: 2, // Maximum number of line breaks to preserve
  });

  return (
    <>
      <div className="blog-container-mse">
        <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
        {formattedHtml}
      </div>
    </>
  );
}
