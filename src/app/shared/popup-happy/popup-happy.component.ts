import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-popup-happy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup-happy.component.html',
  styleUrl: './popup-happy.component.css',
})
export class PopupHappyComponent {
  // add reference of the template
  // @ViewChild('popupHappyModal') content: any;
  @Input() show: boolean = false;
  @Input() happyMessage: string = 'Your transaction has been successfully.';

  constructor() {}

  closePopup() {
    console.log('closePop');
    this.show = false;
  }
}
