import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild, output } from '@angular/core';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css',
})
export class PopupComponent {
  // add reference of the template
  @ViewChild('popupModal') content: any;
  @Input() show: boolean = false;
  @Input() errMessage:string = 'Your transaction has failed. Please go back and try again.'

  constructor() {
    console.log('show modal', this.show);
  }

  closePopup() {
    console.log('closePopup');
    this.show = false;
  }
}
