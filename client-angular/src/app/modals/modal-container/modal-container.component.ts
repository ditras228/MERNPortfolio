import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { fadeAnimation, modalAnimation } from '../../app.animation';
import { isPlatformBrowser } from '@angular/common';
import { setAuth } from '../login/store/login-modal.actions';
import { selectIsAuth } from '../login/store/login-modal.selectors';
import {
  selectCreateDescVisible,
  selectCreateWorkVisible,
  selectEditDescVisible,
  selectEditInfoVisible,
  selectEditWorkVisible,
  selectIsLoginVisible,
  selectLock,
} from '../modal/store/modal.selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.scss'],
  animations: [modalAnimation, fadeAnimation],
})
export class ModalContainerComponent implements OnInit {
  constructor(private store$: Store, @Inject(PLATFORM_ID) private platformId) {}

  public isLoginVisible: boolean | undefined;
  public isEditInfoVisible: boolean | undefined;
  public isEditWorkVisible: boolean | undefined;
  public isEditDescVisible: boolean | undefined;
  public isCreateWorkVisible: boolean | undefined;
  public isCreateDescVisible: boolean | undefined;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.store$
        .select(selectIsLoginVisible)
        .subscribe(value => (this.isLoginVisible = value));
      this.store$
        .select(selectEditInfoVisible)
        .subscribe(value => (this.isEditInfoVisible = value));
      this.store$
        .select(selectEditWorkVisible)
        .subscribe(value => (this.isEditWorkVisible = value));
      this.store$
        .select(selectEditDescVisible)
        .subscribe(value => (this.isEditDescVisible = value));
      this.store$
        .select(selectCreateWorkVisible)
        .subscribe(value => (this.isCreateWorkVisible = value));
      this.store$
        .select(selectCreateDescVisible)
        .subscribe(value => (this.isCreateDescVisible = value));
    }
  }
}
