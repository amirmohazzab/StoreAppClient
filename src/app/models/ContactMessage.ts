export interface ContactMessage {
    name: string,
    email: string,
    subject: string,
    message: string,
}

export interface IAdminContactMessageFilter {
  isRead?: boolean | null; 
  search?: string | null;
  pageNumber: number;
  pageSize: number;
}

export interface UserContactConversation {
  id: number;
  subject: string;
  created: string;
  hasUnreadByAdmin: boolean;
  hasReply: boolean;
  messages?: UserContactMessage[];
}

export interface UserContactMessage {
  id: number,
  message: string;
  sender: MessageSender;
  created: string;
  isRead: boolean;
  attachments: IContactAttachment[]
}

export enum MessageSender {
  User = 1,
  Admin = 2,
}

export interface IContactAttachment {
  fileName: string;
  filePath: string;
}



