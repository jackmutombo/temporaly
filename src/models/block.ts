export interface Block {
  id: string;
  name: string;
  targetYield: number;
  //   yield: number;
  plantDate: Date;
  harvestDate: Date;
  createdDate: Date;
  lastEditedDate: Date;
  blockSize: number;
  createdBy: string;
  lastEditedBy: string;
  enabled: true;
  excelUrl: string;
  farmName: string;
  farmId: string;
}

export interface BlockPagination {
  data: Block[];
  page: number;
  pageSize: number;
  count: number;
}

export interface BlockParams {
  farmId: string;
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  textSearch: string;
}
