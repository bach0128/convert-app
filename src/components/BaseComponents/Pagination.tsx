'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/Shadcn/pagination';

export default function Component({
  handleNextPage,
  handlePrevPage,
  handlePageClick,
  currentPage,
  total,
  itemsPerPage,
}: {
  handleNextPage: () => void;
  handlePrevPage: () => void;
  handlePageClick: (page: number) => void;
  currentPage: number;
  total: number;
  itemsPerPage: number;
}) {
  const totalPages = Math.ceil(total / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const getVisiblePageNumbers = () => {
    if (totalPages <= 7) {
      return pageNumbers;
    }

    const visiblePages = [];
    visiblePages.push(1);

    if (currentPage > 3) {
      visiblePages.push(-1);
    }

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      visiblePages.push(i);
    }

    if (currentPage < totalPages - 2) {
      visiblePages.push(-1);
    }

    if (totalPages > 1) {
      visiblePages.push(totalPages);
    }

    return [...new Set(visiblePages)].sort((a, b) => a - b);
  };

  const visiblePageNumbers = getVisiblePageNumbers();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={
              currentPage === 1 ? (e) => e.preventDefault() : handlePrevPage
            }
            aria-disabled={currentPage === 1}
            tabIndex={currentPage === 1 ? -1 : 0}
          />
        </PaginationItem>
        {visiblePageNumbers.map((pageNumber, index) =>
          pageNumber === -1 ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href="#"
                onClick={() => handlePageClick(pageNumber)}
                isActive={currentPage === pageNumber}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          )
        )}
        <PaginationNext
          href="#"
          onClick={
            currentPage === totalPages
              ? (e) => e.preventDefault()
              : handleNextPage
          }
          aria-disabled={currentPage === totalPages}
          tabIndex={currentPage === totalPages ? -1 : 0}
        />
      </PaginationContent>
    </Pagination>
  );
}

Component.defaultProps = {
  handleNextPage: () => {},
  handlePrevPage: () => {},
  handlePageClick: (_page: number) => {},
  currentPage: 1,
  total: 100, // Default total items
  itemsPerPage: 10, // Default items per page
};
