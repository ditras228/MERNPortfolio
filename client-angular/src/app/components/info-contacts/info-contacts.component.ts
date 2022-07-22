import { Component, Input } from '@angular/core';
import { Contacts } from '../../../generated/graphql';
import { WindowService } from '../../services/window.service';

@Component({
  selector: 'app-info-contacts',
  templateUrl: './info-contacts.component.html',
  styleUrls: ['./info-contacts.component.scss'],
})
export class InfoContactsComponent {
  @Input() contacts: Contacts | undefined;

  constructor(public windowService: WindowService) {}

  public openLinkHandler(link: string | undefined): void {
    this.windowService.get(link);
  }
}
