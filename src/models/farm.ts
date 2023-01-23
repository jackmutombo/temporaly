import { Block } from './block';

export interface Farm {
  id: string;
  name: string;
  business: string;
  businessId: string;
  location?: string;
  numberOfBlocks: number;
  nearestTown?: string;
  primaryAgent?: string;
  plantableLand: number;
  contactNumber?: string;
  farmEmail?: string;
  farmManager?: string;
  cropAdvisor?: string;
  farmBlocks?: Block[];
}

export interface FarmParams {
  pageNumber: number;
  pageSize: number;
  sortBy?: string;
  textSearch?: string;
}

export interface FarmPagination {
  data: Farm[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
}
