import { Timestamp } from "firebase/firestore";

export interface IDocShare {
  id?: number|string;
  title: string;
  category?: string;
  docUrl?: string;
  createdAt: string | Timestamp;
  uid?: string
}
