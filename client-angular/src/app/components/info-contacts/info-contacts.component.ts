import {Component, Input, OnInit} from '@angular/core';
import {Contacts} from "../../../generated/graphql";
import {LinkService} from "../../services/link.service";

@Component({
  selector: 'app-info-contacts',
  templateUrl: './info-contacts.component.html',
  styleUrls: ['./info-contacts.component.scss']
})
export class InfoContactsComponent implements OnInit {
  constructor(    public linkService: LinkService) { }
  @Input () contacts : Contacts | undefined
  ngOnInit(): void {
  }
  public telegram(): void{
    window.open(this.linkService.github())
  }
}
