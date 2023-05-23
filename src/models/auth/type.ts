import type { AdminRole, Status } from 'utils/types';

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export type IAdmin = {
  email: string;
  name: string;
  isInitial?: boolean;
  role: AdminRole;
  _id: string;
  status: Status;
  createdAt: string;
};
