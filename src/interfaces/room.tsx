export interface IRoom {
  id: number;
  owner_id: number;
  name: string;
  address: string;
  type: ERoomType;
  area: number;
  distance_to_school: number;
  price: number;
  created_at?: string;
  updated_at?: string;
  owner: {
    id: number;
    username: string;
    avatar?: string;
    role?: string;
  };
  room_attribute?: {
    id: number;
    room_id: number;
    wifi_internet: boolean;
    air_conditioner: boolean;
    water_heater: boolean;
    refrigerator: boolean;
    washing_machine: boolean;
    enclosed_toilet: boolean;
    safed_device: boolean;
    electronic_price: number;
    water_price: number;
    description: string;
    created_at?: string;
    updated_at?: string;
  };
  room_image: {
    id: number;
    room_id: number;
    image_url: string;
    created_at?: string;
    updated_at?: string;
  }[];
  review: IReview[];
}

export interface IRoomCreateInput {}

export interface IRoomsParams {
  page?: number;
  page_size?: number;
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
  electronic_price_from?: number;
  electronic_price_to?: number;
  water_price_from?: number;
  water_price_to?: number;
  wifi_internet?: boolean;
  air_conditioner?: boolean;
  water_heater?: boolean;
  refrigerator?: boolean;
  washing_machine?: boolean;
  enclosed_toilet?: boolean;
  safed_device?: boolean;
}

export interface IReview {
  id: number;
  room_id: number;
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
  review_image: {
    id: number;
    review_id: number;
    image_url: string;
  }[];
}

export interface IReviewParam {
  user_id: number;
  room_id: number;
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
