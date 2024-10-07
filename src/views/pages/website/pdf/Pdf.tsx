import { useEffect } from "react";

interface PdfProps {}

export function Pdf(props: PdfProps) {
  useEffect(() => {
    window.location.href = "/white-paper.pdf";
  }, []);

  return null;
}
