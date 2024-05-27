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
  userName: string;
  userEmail: string;
 
}
