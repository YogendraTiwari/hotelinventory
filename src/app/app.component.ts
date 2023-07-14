import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { RoomsComponent } from './rooms/rooms.component';
import { LocalStorageToken } from './localstorage.token';
import { InitService } from './init.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'hinv-root',
  templateUrl: './app.component.html',
  // template: `<h1>For mutli line use above operator</h1>
  //   This is multi line text `,
  // styleUrls: ['./app.component.scss'],
  styles: [
    `
      h1 {
        color: red;
      }
    `,
  ],
})
export class AppComponent implements AfterViewInit, OnInit {
  constructor(
    @Inject(LocalStorageToken) private localStorage: Storage,
    private initService: InitService,
    private router: Router
  ) {
    console.log(initService.config);
  }
  ngOnInit(): void {
    // Subscribe the router events, it will log all events start from navigation
    //start to scroll
    // this.router.events.subscribe((event) => {
    //   console.log('Router event', event);
    // });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event) => {
        console.log('Navigation started');
      });
    //Listning specific events
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        console.log('Navigation started');
      });
    this.localStorage.setItem('name', 'myur Hotel');
  }

  ngAfterViewInit(): void {
    const componentRef = this.vcr.createComponent(RoomsComponent);
  }
  title = 'holelinventoryapp';
  role = 'Admin';

  @ViewChild('user', { read: ViewContainerRef }) vcr!: ViewContainerRef;
}
