import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: string[] = [];
  isSuccess: boolean;
 
  add(message: string, isSuccess: boolean) {
    this.messages.push(message);
    this.isSuccess = isSuccess;
  }
 
  clear() {
    this.messages = [];
  }
}
