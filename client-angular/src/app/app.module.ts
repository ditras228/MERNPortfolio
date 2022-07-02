import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WorkListComponent } from './work-list/work-list.component';
import { WorkComponent } from './work/work.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarInfoComponent } from './sidebar-info/sidebar-info.component';
import { InfoToolsComponent } from './info-tools/info-tools.component';
import { InfoSkillsComponent } from './info-skills/info-skills.component';
import { InfoContactsComponent } from './info-contacts/info-contacts.component';

@NgModule({
  declarations: [
    AppComponent,
    WorkListComponent,
    WorkComponent,
    NavbarComponent,
    SidebarComponent,
    SidebarInfoComponent,
    InfoToolsComponent,
    InfoSkillsComponent,
    InfoContactsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
