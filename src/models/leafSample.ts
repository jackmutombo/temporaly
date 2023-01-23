export interface LeafSample {
  id: string;
  inteligroLabNumber?: string;
  farmBlock: string;
  blockCrop: string;
  crop: string;
  n: number;
  p: number;
  k: number;
  ca: number;
  mg: number;
  na: number;
  mn: number;
  fe: number;
  cu: number;
  zn: number;
  b: number;
  mo: number;
  s: number;
  cl: number;
  createdBy: string;
  createdDate: Date;
}

export interface LeafSamplePagination {
  data: LeafSample[];
  page: number;
  pageSize: number;
  count: number;
}

export interface LeafSampleParams {
  blockId?: string;
  cropId?: string;
  CreatedById?: string;
  inteligroLabNumber?: string;
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  textSearch?: string;
}
