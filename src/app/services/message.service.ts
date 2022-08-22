import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: string[] = [];

  constructor() { }

  /**
   * Adds the passed-in message to the messages array.
   * @param message - This is the passed-in message.
   */
  add(message: string) {

    this.messages.push(message);

  }

  /**
   * Clears/empties the messages array.
   */
  clear() {

    this.messages = [];

  }
  
}