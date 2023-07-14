import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
  Optional,
  ViewChild,
} from '@angular/core';
import { Room, RoomList } from './rooms';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';
import { Observable, Subject, catchError, map, of } from 'rxjs';
import { HttpEventType, HttpHeaders } from '@angular/common/http';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'hinv-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit, AfterViewInit {
  totalBytes = '';
  error$ = new Subject<string>();
  priceFilter = new FormControl(0);

  getError$ = this.error$.asObservable();
  // here $ sysmbol represent streaming services, we will use async with that
  // to make to unsubsribe
  rooms$ = this.roomsService.getRooms$.pipe(
    catchError((err) => {
      console.log(err);
      this.error$.next(err.message);
      return of([]);
    })
  );

  roomCount$ = this.roomsService.getRooms$.pipe(map((rooms) => rooms.length));

  stream = new Observable((observer) => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
  });

  ngAfterViewInit(): void {
    this.headerComponent.title = 'Room title';
  }
  // ngAfterViewChecked(): void {
  //   console.log(this.headerComponent);
  // }
  // If we mark service as optional, then service will not generate null exeption
  // If service is not available
  constructor(@Optional() private roomsService: RoomsService) {}
  ngOnInit(): void {
    // Get request
    this.roomsService.getPhotos().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log('Request sent successfully');
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log('Request success');
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalBytes += event.loaded;
          break;
        }
        case HttpEventType.Response: {
          console.log('Request complete');
          console.log(event.body);
        }
      }
    });

    this.stream.subscribe((data) => console.log(data));
    this.roomsService.getRooms$.subscribe((rooms) => {
      this.roomList = rooms;
    });
  }
  name = 'Yogendra';
  hideContent = false;

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  rooms: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5,
  };

  title = '';
  roomList: RoomList[] = [];
  selectedRoom!: RoomList;

  counter: number = 1;

  toggle() {
    this.hideContent = !this.hideContent;
    this.title = 'Room List : ' + this.counter;
    this.counter = this.counter + 1;
  }

  selectRoom(room: RoomList) {
    this.selectedRoom = room;
    console.log('Selected Room', this.selectRoom);
  }
  selectRoomForDeletion(room: RoomList) {
    //Local deletion
    // this.roomList = this.roomList.filter(
    //   (roomObj) => roomObj.roomNumber !== room.roomNumber
    // );
    this.roomsService
      .deleteRoom(room.roomNumber as string)
      .subscribe((data) => {
        this.roomList = data;
      });
  }

  editRoom() {
    const room: RoomList = {
      roomNumber: '3', //this.roomList[this.roomList.length - 1].roomNumber + 1,
      roomType: 'Private Suite',
      amenities: 'Air Conditionar',
      price: 15000,
      photos:
        'https://media.istockphoto.com/id/185083188/photo/luxury-shangri-la-hotel-room.jpg?s=1024x1024&w=is&k=20&c=c07mcS7zJ9-cPEjRS4JE-qGPymHSAoU-DNBsa8wmA8E=',
      checkinTime: new Date('5-Jul-2022'),
      checkoutTime: new Date('6-Jul-2022'),
      rating: 1.897,
    };
    this.roomsService.editRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  addRoom() {
    const room: RoomList = {
      // roomNumber: '4', //this.roomList[this.roomList.length - 1].roomNumber + 1,
      roomType: 'Private Suite',
      amenities: 'Air Conditionar, Free wifi, TV, bathroom accessaries',
      price: 15000,
      photos:
        'https://media.istockphoto.com/id/185083188/photo/luxury-shangri-la-hotel-room.jpg?s=1024x1024&w=is&k=20&c=c07mcS7zJ9-cPEjRS4JE-qGPymHSAoU-DNBsa8wmA8E=',
      checkinTime: new Date('5-Jul-2022'),
      checkoutTime: new Date('6-Jul-2022'),
      rating: 1.897,
    };
    //  this.roomList.push(room);
    //this.roomList = [...this.roomList, room];
    this.roomsService.addRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }
}
