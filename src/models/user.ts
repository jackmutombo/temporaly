export interface User {
  kind: string;
  localId: string;
  email: string;
  displayName?: string;
  idToken: string;
  registered: boolean;
  refreshToken: string;
  expiresIn: string;
  roles: string | string[];
}

export interface UserRefreshToken {
  accessToken: string;
  expiresIn: string;
  tokenType: string;
  refreshToken: string;
  idToken: string;
  userId: string;
  projectId: string;
}

export interface UserPasswordReset {
  kind: string;
  email: string;
}
