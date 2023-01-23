export interface Business {
  id: string;
  name: string;
  inteligroFarmId: string;
  createdBy: string;
  createdDate: Date;
  excelUrl?: string;
  enabled?: boolean;
}

export interface BusinessParams {
    pageNumber: number;
    pageSize: number;
    sortBy?: string;
    textSearch?: string;
    isPagingEnabled?: boolean;
  }
  
  export interface BusinessPagination {
    data: Business[];
    currentPage: number;
    pageSize: number;
    totalPages: number;
  }