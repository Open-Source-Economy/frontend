import React from "react";
import { ToggleGroup, ToggleGroupItem } from "src/views/components/ui/toggle-group";
import { List, Plus } from "lucide-react";

interface ModeToggleProps {
  isBulkMode: boolean;
  onModeChange: (isBulk: boolean) => void;
}

export function ModeToggle({ isBulkMode, onModeChange }: ModeToggleProps) {
  return (
    <ToggleGroup
      type="single"
      value={isBulkMode ? "bulk" : "single"}
      onValueChange={value => {
        if (value) onModeChange(value === "bulk");
      }}
      variant="subtle"
      className="mb-5"
    >
      <ToggleGroupItem value="single" className="flex items-center gap-2">
        <Plus className="w-4 h-4" />
        Single Project
      </ToggleGroupItem>
      <ToggleGroupItem value="bulk" className="flex items-center gap-2">
        <List className="w-4 h-4" />
        Bulk Add
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
