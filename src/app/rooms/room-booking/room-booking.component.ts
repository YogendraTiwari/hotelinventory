import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'hinv-room-booking',
  templateUrl: './room-booking.component.html',
  styleUrls: ['./room-booking.component.scss'],
})
export class RoomBookingComponent implements OnInit {
  // id: number = 0;
  // Make it as stream and have observabe property
  // id$!: Observable<number>;
  // Using param map
  // Load booking compoennt
  id$ = this.router.paramMap.pipe(map((params) => params.get('roomid')));
  constructor(private router: ActivatedRoute) {}
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    // this.router.params.subscribe((params) => {
    //   this.id = params['roomid'];
    // });
    // this.id$ = this.router.params.pipe(map((params) => params['roomid']));
  }
}
