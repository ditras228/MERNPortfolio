import {Component} from '@angular/core';
import {fadeAnimation, modalAnimation} from "../../app.animation";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [modalAnimation, fadeAnimation]
})
export class ModalComponent {
  constructor() {
  }
}
