export const PREVIOUS_PAGE = "PREVIOUS";
export const NEXT_PAGE = "NEXT";
export const ELLIPSIS = "...";

/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */
export const range = (from, to, step = 1) => {
  let i = from;
  const currentRange = [];

  while (i <= to) {
    currentRange.push(i);
    i += step;
  }

  return currentRange;
};

/**
 * Page numbers include strings representing ellipsis, next page and previous page.
 * Let's say we have 10 pages and we set pageNeighbours to 2
 * Given that the current page is 6
 * The pagination control will look like the following:
 *
 *  < (1) ... {4 5} [6] {7 8} ... (10) >
 *
 * (x) => terminal pages: first and last page(always visible)
 * [x] => represents current page
 * {...x} => represents page neighbours
 * ... => ellipsis shown when additional page numbers are hidden
 */
export const fetchPageNumbers = (totalPages, pageNeighbours, currentPage) => {
  /**
   * totalNumbers: the total page numbers to show on the control (2*page neighbours + current page + 2 ellipsis
   * (if an ellipsis is unneeded, an additional number will be displayed in its place to maintain placing)
   * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
   */
  const totalNumbers = pageNeighbours * 2 + 3; // 3 => current page + 2 ellipsis
  const totalBlocks = totalNumbers + 2;

  if (totalPages > totalBlocks) {
    const leftBound = currentPage - pageNeighbours;
    const rightBound = currentPage + pageNeighbours;
    const beforeLastPage = totalPages - 1;

    const startPage = leftBound > 2 ? leftBound : 2;
    const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

    let pages = range(startPage, endPage);

    const pagesCount = pages.length;
    const singleSpillOffset = totalNumbers - pagesCount - 1;

    /**
     * leftSpill: has hidden pages to the left
     * rightSpill: has hidden pages to the right
     */
    const leftSpill = startPage > 2;
    const rightSpill = endPage < beforeLastPage;

    if (leftSpill && !rightSpill) {
      const extraPages = range(startPage - singleSpillOffset, startPage - 1);
      pages = [PREVIOUS_PAGE, 1, ELLIPSIS, ...extraPages, ...pages, totalPages];
    } else if (!leftSpill && rightSpill) {
      const extraPages = range(endPage + 1, endPage + singleSpillOffset);
      pages = [1, ...pages, ...extraPages, ELLIPSIS, totalPages, NEXT_PAGE];
    } else if (leftSpill && rightSpill) {
      pages = [
        PREVIOUS_PAGE,
        1,
        ELLIPSIS,
        ...pages,
        ELLIPSIS,
        totalPages,
        NEXT_PAGE
      ];
    }

    return pages;
  }

  return range(1, totalPages);
};
