export interface PageInfo {
  currentPage: number;
  totalCount: number;
  recordPerPage: number;
}

export const parsePageNumber = (page: any) => {
  const pageNumber = Number(page) || 1;

  if (pageNumber > 0) {
    return pageNumber;
  } else {
    return 1;
  }
};
