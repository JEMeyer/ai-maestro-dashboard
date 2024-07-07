export interface User {
  sub: string;
  email: string;
  email_verified: boolean;
  role: string;
  name: string;
  given_name: string;
  preferred_username: string;
  nickname: string;
  groups: string[];
}
