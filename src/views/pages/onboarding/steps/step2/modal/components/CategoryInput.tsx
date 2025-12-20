import React, { useMemo } from "react";
import { ProjectCategory } from "@open-source-economy/api-types";
import { FormField } from "src/views/components/ui/forms/form-field";
import { ChipInput } from "src/views/components/ui/chip-input";
import { ProjectCategoryCompanion } from "src/ultils/companions";

interface CategoryInputProps {
  predefinedCategories: ProjectCategory[];
  customCategories: string[];
  onChange: (predefined: ProjectCategory[], custom: string[]) => void;
  label?: string;
  hint?: string;
}

export function CategoryInput({
  predefinedCategories,
  customCategories,
  onChange,
  label = "Categories (Optional)",
  hint = "Select from suggestions or type your own. You can add multiple categories.",
}: CategoryInputProps) {
  const allCategories = useMemo(() => {
    return [
      ...predefinedCategories.map(category => ProjectCategoryCompanion.toLabel(category)),
      ...customCategories
    ];
  }, [predefinedCategories, customCategories]);

  const handleChange = (allValues: string[]) => {
    const predefined: ProjectCategory[] = [];
    const custom: string[] = [];

    allValues.forEach(item => {
      const enumValue = Object.values(ProjectCategory).find(cat => ProjectCategoryCompanion.toLabel(cat) === item);
      if (enumValue) {
        predefined.push(enumValue);
      } else {
        custom.push(item);
      }
    });

    onChange(predefined, custom);
  };

  const suggestions = useMemo(() => {
    return Object.values(ProjectCategory)
      .filter(category => !predefinedCategories.includes(category))
      .map(category => ProjectCategoryCompanion.toLabel(category));
  }, [predefinedCategories]);

  return (
    <FormField label={label} hint={hint}>
      <ChipInput
        values={allCategories}
        onChange={handleChange}
        suggestions={suggestions}
        placeholder="Type to search or add categories..."
        allowCustom={true}
        showCount
        countLabel="category"
      />
    </FormField>
  );
}
