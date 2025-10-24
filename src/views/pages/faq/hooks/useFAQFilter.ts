import { useMemo, useState } from "react";
import { faqData, type FAQCategory } from "src/views/pages/faq/data/faqData";

export function useFAQFilter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredData = useMemo(() => {
    if (!searchQuery && !selectedCategory) return faqData;

    return faqData
      .map(category => ({
        ...category,
        questions: category.questions.filter(q => {
          const matchesSearch =
            !searchQuery || q.question.toLowerCase().includes(searchQuery.toLowerCase()) || q.answer.toLowerCase().includes(searchQuery.toLowerCase());

          const matchesCategory = !selectedCategory || category.category === selectedCategory;

          return matchesSearch && matchesCategory;
        }),
      }))
      .filter(category => category.questions.length > 0);
  }, [searchQuery, selectedCategory]);

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    filteredData,
  };
}
