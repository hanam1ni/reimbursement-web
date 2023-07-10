export const RECORD_PER_PAGE = 15;

export const parsePageNumber = (page: any) => {
  const pageNumber = Number(page) || 1;

  if (pageNumber > 0) {
    return pageNumber;
  } else {
    return 1;
  }
};

export const buildPaginationResponse = <T>(
  data: T,
  currentPage: number,
  totalCount: number
) => {
  return {
    data,
    page: { currentPage, totalCount, recordPerPage: RECORD_PER_PAGE },
  };
};
