import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  //The messageService must be public, otherwise the template can't make use of its properties or methods.
  constructor(public messageService: MessageService) { }

  ngOnInit(): void { }

}