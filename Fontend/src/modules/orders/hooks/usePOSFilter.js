import { useState } from "react";
export default function usePOSFilter(productsWithStock) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredProducts = productsWithStock.filter((product) => {
    if (selectedCategory && String(product.Category_id) !== String(selectedCategory)) {
      return false;
    }
    const matchesSearch =
      product.Product_name?.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      product.Product_code?.toLowerCase().includes(searchQuery.toLowerCase().trim());

    return matchesSearch;
  });

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  return {
    searchQuery,
    selectedCategory,
    filteredProducts,
    handleSearchChange,
    handleCategoryChange,
  };
}