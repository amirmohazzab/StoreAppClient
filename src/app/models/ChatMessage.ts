export interface ChatMessage {
    id:number;
    chatRoomId:number;
    senderUserId:string;
    message:string;
    createDate:string;
    attachments: ChatMessageAttachmentDto[];
}

export interface ChatMessageDto {
  id: number;
  chatRoomId: number;
  senderUserId: string;
  message: string;
  createDate: string;
  attachments: ChatMessageAttachmentDto[];
}

export interface ChatMessageAttachmentDto {
  id: number;
  fileName: string;
  filePath: string;
  contentType: string;
  fileSize: number;
}

export interface ChatMessageAttachment {
    id: number;
    fileName: string;
    filePath: string;
    contentType: string;
    fileSize: number;
}