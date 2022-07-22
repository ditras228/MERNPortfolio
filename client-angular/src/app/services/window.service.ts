import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class WindowService {
  constructor(@Inject(PLATFORM_ID) private platformId) {}

  public isOurLink(url: string | undefined): boolean {
    if (platformBrowser(this.platformId)) {
      return window.location.origin == url;
    }
    return false;
  }

  public get(url: string | undefined): void {
    if (platformBrowser(this.platformId)) {
      window.open(url);
    }
  }
}
