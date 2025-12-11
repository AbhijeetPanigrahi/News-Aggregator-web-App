import React from "react";

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => { },
}) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  const btnClass = (active) => `
    py-2.5 px-4.5 rounded-lg border text-base font-medium cursor-pointer transition-all duration-300 shadow-sm min-w-[44px]
    ${active
      ? 'bg-accent-main border-accent-main text-white hover:bg-accent-dark'
      : 'bg-surface border-border text-text-primary hover:bg-surface-highlight hover:border-accent-main hover:shadow-md hover:-translate-y-0.5'
    }
    disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-highlight disabled:text-text-muted disabled:shadow-none disabled:border-transparent disabled:hover:transform-none
  `;

  return (
    <div className="flex justify-center items-center gap-3 py-10 px-6 mt-12 flex-wrap">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        title="Previous page"
        className={btnClass(false)}
      >
        ← Prev
      </button>

      {pageNumbers.map((page, index) => {
        if (page === "ellipsis") {
          return <span key={`ellipsis-${index}`} className="text-text-muted px-1 text-xl font-semibold">...</span>;
        }
        return (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={btnClass(currentPage === page)}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        title="Next page"
        className={btnClass(false)}
      >
        Next →
      </button>

      <div className="py-2.5 px-5 bg-surface rounded-lg border border-border text-text-secondary text-base font-medium min-w-[160px] text-center shadow-sm">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default Pagination;
