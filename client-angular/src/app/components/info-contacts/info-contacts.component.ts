import {Component, Input, OnInit} from '@angular/core';
import {Contacts} from "../../../generated/graphql";

@Component({
  selector: 'app-info-contacts',
  templateUrl: './info-contacts.component.html',
  styleUrls: ['./info-contacts.component.scss']
})
export class InfoContactsComponent{
  constructor(   ) { }
  @Input () contacts : Contacts | undefined

  public openLink(link: string | undefined): void{
    window.open(link)
  }
}
