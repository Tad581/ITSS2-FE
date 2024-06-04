export interface IRoom {
  roomId: string;
  romOwnerId: string;
  name: string;
  address: string;
  type: ERoomType;
  area: number;
  // distance_to_school: number;
  price: string;
  created_at?: string;
  updated_at?: string;
  user: {
    id: string;
    username: string;
    avatar?: string;
    role?: number;
  };
  roomAttribute?: {
    id: string;
    roomId: number;
    wifiInternet: boolean;
    airConditioner: boolean;
    waterHeater: boolean;
    refrigerator: boolean;
    washingMachine: boolean;
    enclosedToilet: boolean;
    safedDevice: boolean;
    electronicPrice: number;
    waterPrice: number;
    description: string;
    created_at?: string;
    updated_at?: string;
    tag: string;
  };
  roomImages: {
    id: string;
    roomId: string;
    imageUrl: string;
    created_at?: string;
    updated_at?: string;
  }[];
  reviews: IReview[];
}

export interface IRoomCreateInput {
  ownerId: string,
  Name: string,
  Address: string,
  Type: string,
  Area: number,
  Price: number,
  ElectronicPrice: number,
  WaterPrice: number,
  Description: string,
  WifiInternet: boolean,
  WashingMachine: boolean,
  AirConditioner: boolean,
  WaterHeater: boolean,
  Refrigerator: boolean,
  SafedDevice: boolean,
  EnclosedToilet: boolean,
  Tag: string,
  Images: string[],
}

export interface IRoomsParams {
  page?: number;
  pageSize?: number;
  name?: string;
  address?: string;
  type?: ERoomType | string;
  area_from?: number;
  area_to?: number;
  price_from?: number;
  price_to?: number;
  electronicPrice_from?: number;
  electronicPrice_to?: number;
  waterPrice_from?: number;
  waterPrice_to?: number;
  wifiInternet?: boolean;
  airConditioner?: boolean;
  waterHeater?: boolean;
  refrigerator?: boolean;
  washingMachine?: boolean;
  enclosedToilet?: boolean;
  safedDevice?: boolean;
  sortOptions?: EOrderDirection;
}

export interface IReview {
  id: number;
  roomId: number;
  userid: number;
  content: string;
  star: number;
  createdAt: string;
  user: {
    id: number;
    username: string;
    avatar: string | null;
    role: number;
  };
  reviewImages: {
    id: string;
    reviewId: string;
    imageUrl: string;
  }[];
}

export interface IReviewParam {
  UserId: string;
  RoomId: string;
  content: string;
  Star: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Images: any[];
}

export enum ERoomType {
  PHONGTRO = 'PHONGTRO',
  CCMN = 'CCMN',
  Homestay = 'Homestay',
}

export enum EOrderDirection {
  PLUS_PRICE = "+Price",
  MINUS_PRICE = "-Price",
  PLUS_AREA = "+Area",
  MINUS_AREA = "-Area",
  PLUS_DATE = "+CreatedOnDate",
  MINUS_DATE = "-CreatedOnDate",
}
