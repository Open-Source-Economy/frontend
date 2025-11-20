import { useEffect } from "react";

interface PdfProps {
  location: string;
}

export function Pdf(props: PdfProps) {
  useEffect(() => {
    window.location.href = props.location;
  }, []);

  return null;
}
