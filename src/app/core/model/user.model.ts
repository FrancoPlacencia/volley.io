/**
 * User information
 */
export interface User {
  // ID
  userId?: number;

  // Auth Info
  email: string;
  password?: string;
  rePassword?: string;
  role?: string;

  // Basic Info
  firstName?: string;
  lastName?: string;
  address?: string;
  phone?: string;
  title?: string;
  bio?: string;

  // Special Info
  token?: string;

  // Admin Info
  isActive?: boolean;
  createdOn?: string;
  isLocked?: boolean;
}
