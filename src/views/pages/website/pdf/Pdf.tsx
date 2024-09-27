import React, { useEffect } from "react";

interface PdfProps {}

export function Pdf(props: PdfProps) {
  useEffect(() => {
    window.location.href = "/white-paper.pdf";
  }, []);

  return null; // This component doesn't need to render anything
}
