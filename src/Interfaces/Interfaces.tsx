export interface ProtectedRouteProps {
  loginData?: object | null;
  children: JSX.Element;
}
export interface AuthForContext {
  loginData: DecodedToken | null;
  // loginData?: object | null;
  saveLoginData: () => void;
  baseUrl?: string;
  requestHeaders?: object;
  // requestHeaders: Record<string, string>;

}
export interface DecodedToken {
  id: string;
  role: string;
  userName: string;
  profileImage?: string;
  userGroup?: string; 

}

export interface RoomDetailsResponse {

  data: {
    room: Room,
    data: {
      token: string;
    };
  };
}

export interface Room {
  name: string;
  location: string;
  description: string;
  images: string[];
  bedrooms: number;
  livingRooms: number;
  otherRooms: number;
  bathrooms: number;
  diningRooms: number;
  televisions: number;
  price: number;
  discount: number;
  error: any
 

}
export interface RoomsListResponse {
  data: {
    rooms: Room[];
  };
}