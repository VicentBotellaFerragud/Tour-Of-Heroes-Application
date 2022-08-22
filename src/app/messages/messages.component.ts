import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  //The message service must be public, otherwise the template cannot make use of its variables and methods.
  constructor(public messageService: MessageService) { }

  ngOnInit(): void { }

}