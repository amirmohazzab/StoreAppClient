import { IPermission } from "./IPermission";

export interface IAdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  userName: string,
  permissions: IPermission[],
  displayName: string,
}