
export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}
