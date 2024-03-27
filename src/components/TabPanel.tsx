import React from "react";

export enum Tab {
  One = 1,
  Two = 2,
}

interface TabPanelProps {
  tab: Tab;
  index: number;
  setActiveTab: (tab: Tab) => void;
  children?: React.ReactNode;
}

export function TabPanel({ tab, index, setActiveTab, children }: TabPanelProps) {
  return (
    <p
      className={(tab === index ? "text__primary" : "text-white") + " text-decoration-none helvetica"}
      style={{ cursor: "pointer" }}
      onClick={() => setActiveTab(tab)}
    >
      {children}
    </p>
  );
}
