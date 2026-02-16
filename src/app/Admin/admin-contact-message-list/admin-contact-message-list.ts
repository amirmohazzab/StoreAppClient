import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IAdminContactMessage, IAdminContactConversation } from '../../models/IAdminContactMessage';
import { ContactUsService } from '../../services/contact-us-service';
import { IPagination } from '../../models/IPagination';
import { IAdminContactMessageFilter, MessageSender } from '../../models/ContactMessage';
import { ContactMessageParams } from '../../models/contactMessageParams';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ActivatedRoute, Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-admin-contact-message-list',
  imports: [FormsModule, AsyncPipe, DatePipe, PaginationModule, CommonModule, RouterModule],
  templateUrl: './admin-contact-message-list.html',
  styleUrl: './admin-contact-message-list.scss'
})

export class AdminContactMessageList implements OnInit{

  public URL = URL;
  contactmessages: IAdminContactConversation[] = [];
  unreadMessagesCount = 0;
  contactMessageParams = new ContactMessageParams();
  conversations: IAdminContactConversation[] = [];
  messages: IAdminContactMessage[] = [];
  selectedConversationId?: number | null = null;
  filterTimeout: any;

  totalCount: number = 0;
  filter: IAdminContactMessageFilter = {
    isRead: null,     
    search: null, 
    pageNumber: 1,
    pageSize: 5,
  };

  unreadCount$! : Observable<number>;
  replyText: { [conversationId: number]: string } = {};
  selectedConversation: IAdminContactConversation;
  formData: FormData;
  selectedFile: File;
  adminAttachments: { [key: number]: File[] } = {};
  public data: IPagination<IAdminContactConversation>;

  constructor(private contactUsService: ContactUsService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.unreadCount$ = this.contactUsService.unreadCount$;
    this.contactUsService.getUnreadCount().subscribe();

    this.route.queryParams.subscribe(params => {
      this.filter.pageNumber = +params['page'] || 1;
      this.filter.search = params['search'] || null;
      this.filter.isRead = params['isRead'] ?? null;
      this.loadConversations();
    });
  }

loadMessages() {
   this.contactUsService.getContactMessages(this.contactMessageParams).subscribe(res => {
     this.conversations = res.result;
     this.totalCount = res.totalCount;
   });
}

markAsUnread(m: IAdminContactMessage) {
  this.contactUsService.markAsUnread(m.id).subscribe(() => {
    m.isRead = false;
    this.selectedConversation.hasUnRead = true;
  });
}

onFilterChange() {
  clearTimeout(this.filterTimeout);
  this.filterTimeout = setTimeout(() => {
    this.contactMessageParams.pageNumber = 1;
    this.loadMessages();
  }, 1500);
}

deleteMessage(m: IAdminContactMessage) {
  if (!confirm('Delete this message?')) return;

  this.contactUsService.deleteMessage(m.id, !m.isRead).subscribe(() => {
    this.loadMessages();
  });
}

onAdminFileSelected(event: any, convId: number) {
  const files = Array.from(event.target.files) as File[];
  if (!this.adminAttachments[convId]) {
    this.adminAttachments[convId] = [];
  }
  this.adminAttachments[convId].push(...files);
}

markAsRead(m: IAdminContactMessage) {
  this.contactUsService.markAsRead(m.id).subscribe(() => {
    m.isRead = true;
    const hasUnread = this.messages
      .some(x => x.sender === MessageSender.User && !x.isRead);
    this.selectedConversation.hasUnRead = hasUnread;
  });
}

hasUnread(c: IAdminContactConversation): boolean {
  return c.messages.some(m => !m.isRead && m.sender === 1);
}

loadConversations() {
  this.contactUsService.getConversations(this.filter).subscribe(res => {
    this.conversations = res.result;
    this.totalCount = res.totalCount;
    this.filter.pageNumber = res.pageNumber;
  });
}

openConversation(c: IAdminContactConversation) {
  if (this.selectedConversationId === c.id) {
    this.selectedConversationId = null;
    this.selectedConversation = null;
    this.messages = [];
    return;
  }
  this.selectedConversationId = c.id;
  this.selectedConversation = c;

  this.contactUsService.getMessages(c.id).subscribe(res => {
    this.messages = res;
  });
}

reply(conv: IAdminContactConversation) {
  const text = this.replyText[conv.id];
  if (!text?.trim()) return;
  const files = this.adminAttachments[conv.id] || [];

  this.contactUsService
    .reply(conv.id, text, files)
    .subscribe(() => {
      this.replyText[conv.id] = '';
      this.adminAttachments[conv.id] = [];
      conv.hasReply = true;
      this.contactUsService.getMessages(conv.id)
        .subscribe(res => {
          this.messages = res;
        });
    });
}

toggleConversation(conversationId: number) {
  if (this.selectedConversationId === conversationId) {
    this.selectedConversationId = null;
    this.selectedConversation = null;
    return;
  }
  this.selectedConversationId = conversationId;
}

deleteConversation (c: IAdminContactConversation){
  if (!confirm('Delete this conversation?')) return;

  const hadUnread = c.hasUnRead;
  this.contactUsService.deleteConversation(c.id)
    .subscribe(() => {
      this.loadConversations();
      this.contactUsService.getUnreadCount().subscribe();
      if (hadUnread) {
        this.contactUsService.decreaseUnreadCount();
      }
    });
}

onPageChanged(event: any) {
   this.router.navigate([], {
     queryParams: {
       page: event.page
     },
     queryParamsHandling: 'merge'
  });
}

onDragOver(event: DragEvent) {
  event.preventDefault();
}

onDrop(event: DragEvent, convId: number) {
  event.preventDefault();

  const files = Array.from(event.dataTransfer?.files || []);

  if (!this.adminAttachments[convId]) {
    this.adminAttachments[convId] = [];
  }

  this.adminAttachments[convId].push(...files);
}

removeFile(convId: number, index: number) {
  this.adminAttachments[convId].splice(index, 1);
}

isImage(file: File): boolean {
  return file.type.startsWith('image/');
}


}
