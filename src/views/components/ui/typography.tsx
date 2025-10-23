import * as React from "react";
import { cn } from "../utils";

// --- Polymorphic typing helpers ---
type AsProp<T extends React.ElementType> = {
  as?: T;
};

type PolymorphicProps<T extends React.ElementType> = AsProp<T> & {
  children: React.ReactNode;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

type PolymorphicComponent = <T extends React.ElementType = "span">(props: PolymorphicProps<T> & { ref?: React.Ref<Element> }) => React.ReactElement | null;

// --- Factory to build simple text components with optional "as" ---
function createTextComponent<TDefault extends React.ElementType>(defaultTag: TDefault, baseClass: string) {
  const Comp = React.forwardRef<Element, PolymorphicProps<React.ElementType>>(({ as: Tag = defaultTag, className, children, ...props }, ref) => {
    const TagAny = Tag as React.ElementType;
    return (
      <TagAny ref={ref} className={cn(baseClass, className)} {...props}>
        {children}
      </TagAny>
    );
  }) as unknown as PolymorphicComponent;

  // Comp.displayName = `Typography(${baseClass})`;
  return Comp;
}

// --- Display (hero) ---
export const DisplayLarge = createTextComponent("h1", "text-display-large");
export const DisplayMedium = createTextComponent("h1", "text-display-medium");
export const DisplaySmall = createTextComponent("h1", "text-display-small");

// --- Semantic headings (fixed concrete tags, keep correct HTMLHeadingElement attrs) ---
export const H1 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, children, ...props }, ref) => (
  <h1 ref={ref} className={cn("text-headline-large", className)} {...props}>
    {children}
  </h1>
));
H1.displayName = "H1";

export const H2 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, children, ...props }, ref) => (
  <h2 ref={ref} className={cn("text-headline-medium", className)} {...props}>
    {children}
  </h2>
));
H2.displayName = "H2";

export const H3 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, children, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-headline-small", className)} {...props}>
    {children}
  </h3>
));
H3.displayName = "H3";

export const H4 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, children, ...props }, ref) => (
  <h4 ref={ref} className={cn("text-title-large", className)} {...props}>
    {children}
  </h4>
));
H4.displayName = "H4";

export const H5 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, children, ...props }, ref) => (
  <h5 ref={ref} className={cn("text-title-medium", className)} {...props}>
    {children}
  </h5>
));
H5.displayName = "H5";

export const H6 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, children, ...props }, ref) => (
  <h6 ref={ref} className={cn("text-title-small", className)} {...props}>
    {children}
  </h6>
));
H6.displayName = "H6";

// --- Body text (polymorphic, default <p>) ---
export const BodyLarge = createTextComponent("p", "text-body-large");
export const BodyMedium = createTextComponent("p", "text-body-medium");
export const BodySmall = createTextComponent("p", "text-body-small");

// --- Specialized ---
export const Lead = createTextComponent("p", "text-lead");
export const Caption = createTextComponent("span", "text-caption");
export const Overline = createTextComponent("span", "text-overline");

// --- Labels (default <label>) ---
export const LabelLarge = createTextComponent("label", "text-label-large");
export const LabelMedium = createTextComponent("label", "text-label-medium");
export const LabelSmall = createTextComponent("label", "text-label-small");

// --- Code ---
export const Code = createTextComponent("code", "text-code");

// --- Blockquote (keeps correct quote element typing) ---
export const Blockquote = React.forwardRef<HTMLQuoteElement, React.HTMLAttributes<HTMLQuoteElement>>(({ className, children, ...props }, ref) => (
  <blockquote ref={ref} className={cn("border-l-4 border-brand-primary pl-4 italic text-muted-foreground", className)} {...props}>
    {children}
  </blockquote>
));
Blockquote.displayName = "Blockquote";

// --- Lists ---
export const List = React.forwardRef<
  HTMLOListElement | HTMLUListElement,
  (
    | (React.HTMLAttributes<HTMLOListElement> & { ordered: true })
    | (React.HTMLAttributes<HTMLUListElement> & { ordered?: false })
    | (React.HTMLAttributes<HTMLUListElement> & { ordered?: undefined })
  ) & { className?: string; children: React.ReactNode }
>(({ ordered, className, children, ...props }, ref) => {
  if (ordered) {
    return (
      <ol ref={ref as React.Ref<HTMLOListElement>} className={cn("mb-4 pl-6 list-decimal", className)} {...(props as React.HTMLAttributes<HTMLOListElement>)}>
        {children}
      </ol>
    );
  }
  return (
    <ul ref={ref as React.Ref<HTMLUListElement>} className={cn("mb-4 pl-6 list-disc", className)} {...(props as React.HTMLAttributes<HTMLUListElement>)}>
      {children}
    </ul>
  );
});
List.displayName = "List";

export const ListItem = React.forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement>>(({ className, children, ...props }, ref) => (
  <li ref={ref} className={cn("mb-1", className)} {...props}>
    {children}
  </li>
));
ListItem.displayName = "ListItem";

// --- Emphasis ---
export const Strong = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(({ className, children, ...props }, ref) => (
  <strong ref={ref} className={cn("font-semibold", className)} {...props}>
    {children}
  </strong>
));
Strong.displayName = "Strong";

export const Emphasis = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(({ className, children, ...props }, ref) => (
  <em ref={ref} className={cn("italic", className)} {...props}>
    {children}
  </em>
));
Emphasis.displayName = "Emphasis";

// --- Muted ---
export const Muted = createTextComponent("span", "text-muted-foreground");

// Aliases
export const HeadlineLarge = H1;
export const HeadlineMedium = H2;
export const HeadlineSmall = H3;

export const TitleLarge = H4;
export const TitleMedium = H5;
export const TitleSmall = H6;

// Namespace export
export const Typography = {
  DisplayLarge,
  DisplayMedium,
  DisplaySmall,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  HeadlineLarge,
  HeadlineMedium,
  HeadlineSmall,
  TitleLarge,
  TitleMedium,
  TitleSmall,
  BodyLarge,
  BodyMedium,
  BodySmall,
  Lead,
  Caption,
  Overline,
  LabelLarge,
  LabelMedium,
  LabelSmall,
  Code,
  Blockquote,
  List,
  ListItem,
  Strong,
  Emphasis,
  Muted,
};

export default Typography;
