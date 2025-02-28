interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card(props: CardProps) {
  return <div className={`rounded-[20px] bg-theme-blue p-7 flex gap-4 flex-col items-center justify-center ${props.className}`}>{props.children}</div>;
}
