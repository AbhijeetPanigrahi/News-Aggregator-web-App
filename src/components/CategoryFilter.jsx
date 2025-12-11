import React from "react";

const CategoryFilter = ({
  categories = [],
  selectedCategory = "",
  onSelectCategory = () => { },
}) => {
  return (
    <div className="flex flex-wrap gap-3 p-0">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`
            py-2 px-4 border rounded-full text-sm font-medium cursor-pointer transition-all duration-300 tracking-wide hover:-translate-y-px active:scale-98
            ${selectedCategory === category
              ? 'border-accent-main bg-accent-main text-white font-semibold hover:bg-accent-main hover:text-white'
              : 'border-border bg-transparent text-text-secondary hover:border-accent-main hover:bg-surface-highlight hover:text-text-primary'
            }
          `}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
