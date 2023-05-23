import type { RouteObject } from 'react-router-dom';

export interface AntRoute {
  exact?: boolean;
  icon?: any;
  name?: string;
  flatMenu?: boolean;
  path: string;
  // Optional secondary menu
  children?: AntRoute[];
  menu?: boolean;
}
export type RouteItem = RouteObject & Omit<AntRoute, 'chilren'>;
