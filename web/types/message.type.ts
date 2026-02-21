export interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  text: string;
  seen: boolean;
  createdAt: string;
}
