import React, { useEffect, useState } from "react";
import { Converter } from "showdown";
import DOMPurify from "dompurify";
import { html as beautifyHtml } from "js-beautify";

interface MdConversionProps {}

export function MdConversion(props: MdConversionProps) {
  const filePath = "/WIP-MdConversion.md";
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

  useEffect(() => {
    // Add copy functionality to code blocks
    const preElements = document.querySelectorAll(".blog-container-mse pre");

    preElements.forEach(pre => {
      pre.addEventListener("click", async () => {
        try {
          const code = pre.querySelector("code")?.textContent || "";
          await navigator.clipboard.writeText(code);

          // Optional: Add visual feedback for copy
          const feedback = document.createElement("div");
          feedback.textContent = "Copied!";
          feedback.style.cssText = `
            position: fixed;
            right: 15px;
            top: 50px;
            background: #fff;
                 color: #000;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
          `;
          pre.appendChild(feedback);
          setTimeout(() => feedback.remove(), 5000);
        } catch (err) {
          console.error("Failed to copy code:", err);
        }
      });
    });

    // Cleanup event listeners
    return () => {
      preElements.forEach(pre => {
        pre.replaceWith(pre.cloneNode(true));
      });
    };
  }, [markdownText]); // Re-run when markdown content changes

  const converter = new Converter();
  const dirtyHtml = converter.makeHtml(markdownText);
  const cleanHtml = DOMPurify.sanitize(dirtyHtml);
  const formattedHtml = beautifyHtml(cleanHtml, {
    indent_size: 2,
    preserve_newlines: true,
    max_preserve_newlines: 2,
  });

  return (
    <>
      <div className="blog-container-mse">
        <div className="blog-container">
          <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
          {formattedHtml}
        </div>
      </div>
    </>
  );
}
