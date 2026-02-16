import { Component, OnInit } from '@angular/core';
import { MessageSender, UserContactConversation, UserContactMessage } from '../models/ContactMessage';
import { ProfileService } from '../services/profile-service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe, JsonPipe } from '@angular/common';
import { HomeService } from '../services/home-service';
import { ContactUsService } from '../services/contact-us-service';

@Component({
  selector: 'app-user-contact-list',
  imports: [DatePipe],
  templateUrl: './user-contact-list.html',
  styleUrl: './user-contact-list.scss'
})
export class UserContactList implements OnInit{

  conversations: UserContactConversation[] = [];
  loading = false;
  selectedConversationId: number | null = null;
  //messages: UserContactMessage[] = [];

  constructor(
    private profileService: ProfileService, 
    private homeService: HomeService, 
    private toastr: ToastrService, 
    private contactUsService: ContactUsService
  ) {}

   ngOnInit(): void {
     //this.loadConversations();
     //this.profileService.messages$.subscribe(messages => this.conversations = messages);
     this.profileService.getUserConversations().subscribe(res => this.conversations = res);
     //this.homeService.refreshMessage$.subscribe(() => this.loadConversations());
     //this.profileService.conversations$.subscribe(c => this.conversations = c);
   }

//   ngOnInit() {
//   this.homeService.messages$.subscribe(messages => {
//     this.conservations = messages;
//     this.totalCount = messages.length;
//   });

//   loadMessages() {
//    this.contactUsService.getContactMessages(this.contactMessageParams).subscribe(res => {
//      this.contactmessages = res.result;
//      this.totalCount = res.totalCount;
//    });
//  }

//   // بار اول هم load کن
//   this.homeService.loadMessages();
// }

  // loadConversations() {
  //   this.loading = true;

  //   this.profileService.loadConversations().subscribe({
  //     next: res => {
  //       this.conversations = res;
  //       this.loading = false;
  //       console.log(this.conversations);
  //     },
  //     error: () => {
  //       this.toastr.error('Failed to load messages');
  //       this.loading = false;
  //     }
  //   });
  // }

  // isAdmin(sender: MessageSender) {
  //   return sender === MessageSender.Admin;
  // }


  // openConversation(conversationId: number) {
       
  //   if (this.selectedConversationId === conversationId) {
  //     this.selectedConversationId = null;
  //     return;
  //   }
  //   this.selectedConversationId = conversationId;
  //   this.profileService.getConversationMessages(conversationId).subscribe(msgs => {
  //       this.messages = msgs;
  //       this.profileService.markAdminMessagesAsRead(conversationId).subscribe(() => {
  //     const conv = this.conversations.find(c => c.id === conversationId);
  //     if (conv) {
  //       conv.hasUnread = false;
  //     }
  //    });
  //   });
  // }


//   openConversation(conversationId: number) {

//   if (this.selectedConversationId === conversationId) {
//     this.selectedConversationId = null;
//     return;
//   }

//   this.selectedConversationId = conversationId;

//   // فقط وضعیت read را آپدیت کن
//   this.profileService.markAdminMessagesAsRead(conversationId).subscribe(() => {
//     const conv = this.conversations.find(c => c.id === conversationId);
//     if (conv) {
//       conv.hasUnread = false;

//       // اگر خواستی local هم read شود
//       conv.messages.forEach(m => {
//         if (m.sender === MessageSender.Admin) {
//           m.isRead = true;
//         }
//       });
//     }
//   });
// }

openConversation(conversationId: number) {

  const conv = this.conversations.find(c => c.id === conversationId);
  if (!conv) return;

  this.selectedConversationId =
    this.selectedConversationId === conversationId ? null : conversationId;

  if (!Array.isArray(conv.messages)) {
    this.profileService
      .getConversationMessages(conversationId)
      .subscribe(msgs => {
        conv.messages = msgs;

        // ✅ اگر پیام Admin unread وجود دارد
        const hasUnreadAdminMessages = msgs
          .some(m => m.sender === MessageSender.Admin && !m.isRead);

        if (hasUnreadAdminMessages) {
          this.profileService
            .markAdminMessagesAsRead(conversationId)
            .subscribe(() => {

              // locally هم read کن
              conv.messages
                .filter(m => m.sender === MessageSender.Admin)
                .forEach(m => m.isRead = true);
            });
        }
      });
  }
}

// openConversation(conversationId: number) {

//   const conv = this.conversations.find(c => c.id === conversationId);
//   if (!conv) return;

//   this.selectedConversationId =
//     this.selectedConversationId === conversationId ? null : conversationId;

//   if (!Array.isArray(conv.messages)) {
//     this.profileService
//       .getConversationMessages(conversationId)
//       .subscribe(msgs => {
//         conv.messages = msgs;
//       });
//   }

// }

  isAdmin(sender: number) {
    return sender === 2;
  }

  isUser(sender: number) {
    return sender === 1;
  }


}
