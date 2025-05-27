export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

// In-memory mock database
export const users: User[] = [];
