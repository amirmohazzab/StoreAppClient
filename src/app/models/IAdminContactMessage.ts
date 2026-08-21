// export interface IAdminContactMessage{
//     id: number,
//     name: string,
//     email: string,
//     messages: string[],
//     created: string,
//     isRead: boolean
// }

export interface IAdminContactMessageItem {
  id: number;
  message: string;
  sender: 'User' | 'Admin';
  isRead: boolean;
  created: string;
}

export interface IAdminContactConversation {
  id: number;
  name: string;
  email: string;
  subject: string;
  created: string;
  hasUnRead: boolean;
  hasReply: boolean;
  isRead: boolean
  //messages: IAdminContactMessageItem[];
  messages: IAdminContactMessage[];
}

export interface IAdminReplyDto {
  conversationId: number;
  message: string;
}

export interface IAdminConversation {
  id: number;
  name: string;
  email: string;
  subject: string;
  created: string;
  hasUnread: boolean;
}

export interface IAdminContactMessage {
  id: number;
  message: string;
  sender: number; // 1 User | 2 Admin
  isRead: boolean;
  created: string;
  attachments: IAdminContactAttachment[]; 
}

export interface IAdminContactAttachment {
  fileName: string;
  filePath: string;
  url: string
}

