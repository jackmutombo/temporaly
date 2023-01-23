export interface SoilSample {
  id: string;
  inteligroLabNumber: string;
  farmBlock: string;
  blockCrop: string;
  depthTop: number;
  depthBottom: number;
  texture: string;
  ph: number;
  resistance: number;
  na: number;
  p: number;
  k: number;
  h: number;
  ca: number;
  mg: number;
  cu: number;
  zn: number;
  mn: number;
  b: number;
  fe: number;
  s: number;
  cl: number;
  c: number;
  n: number;
  stone: number;
  clay: number;
  createdBy: string;
  createdDate: Date;
}

export interface SoilSamplePagination {
  data: SoilSample[];
  page: number;
  pageSize: number;
  count: number;
}

export interface SoilSampleParams {
    blockId: string;
    cropId?: string;
    createdById?: string;
    inteligroLabNumber?: string;
    pageNumber: number;
    pageSize: number;
    sortBy: string;
    textSearch: string;
  }
  