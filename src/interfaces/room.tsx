export interface IRoom {
  roomId: string;
  romOwnerId: string;
  name: string;
  address: string;
  type: ERoomType;
  area: number;
  // distance_to_school: number;
  price: number;
  created_at?: string;
  updated_at?: string;
  owner: {
    id: string;
    username: string;
    avatar?: string;
    role?: string;
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
  romOwnerId: number,
  name: string,
  address: string,
  type: string,
  area: number,
  distance_to_school: number,
  price: number,
  electronicPrice: number,
  waterPrice: number,
  description: string,
  wifiInternet: boolean,
  washingMachine: boolean,
  airConditioner: boolean,
  waterHeater: boolean,
  refrigerator: boolean,
  safedDevice: boolean,
  enclosedToilet: boolean,
  images: string[],
}

export interface IRoomsParams {
  page?: number;
  pageSize?: number;
  order_direction?: EOrderDirection;
  name?: string;
  address?: string;
  type?: ERoomType;
  area_from?: number;
  area_to?: number;
  distance_to_school_from?: number;
  distance_to_school_to?: number;
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
}

export interface IReview {
  id: number;
  roomId: number;
  user_id: number;
  content: string;
  star: number;
  created_at: string;
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
  userId: string;
  roomId: string;
  content: string;
  star: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  images: any[];
}

export enum ERoomType {
  PHONG_TRO = 'PHONG_TRO',
  CHUNG_CU_MINI = 'CHUNG_CU_MINI',
  HOMESTAY = 'HOMESTAY',
}

export enum EOrderDirection {
  DESC = 'desc',
  ASC = 'asc',
}
