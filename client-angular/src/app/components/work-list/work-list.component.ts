import { Component, Input, OnInit } from '@angular/core';
import { selectWorks } from '../../store/app.selectors';
import { GetWork } from '../../../generated/graphql';
import { Store } from '@ngrx/store';
import { setCreateWorkVisible } from '../../modals/modal/store/modal.actions';

@Component({
  selector: 'app-work-list',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.scss'],
})
export class WorkListComponent implements OnInit {
  works$: GetWork[] | null | undefined;
  @Input() isAuth: boolean = false;

  constructor(public store$: Store) {}
  createWorkHandler(): void {
    this.store$.dispatch(setCreateWorkVisible());
  }
  ngOnInit(): void {
    this.store$.select(selectWorks).subscribe(works => {
      this.works$ = works;
    });
  }
}
