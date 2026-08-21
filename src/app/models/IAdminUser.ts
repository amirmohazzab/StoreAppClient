import { IPermission } from "./IPermission";

export interface IAdminUser {
  id: string;
  userName: string;
  email: string;
  role?: string;
  isActive: boolean;
  createdAt: string;
  permissions: IPermission[],
  displayName: string,
}