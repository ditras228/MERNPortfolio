import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsAuth } from '../../modals/login/store/login-modal.selectors';
import { setLoginVisible } from '../../modals/login/store/login-modal.actions';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public isAuth: boolean | undefined;

  constructor(public store$: Store, public authService: AuthService) {}

  ngOnInit() {
    this.store$.select(selectIsAuth).subscribe(value => (this.isAuth = value));
  }

  showLoginHandler(): void {
    this.store$.dispatch(setLoginVisible());
  }
}
