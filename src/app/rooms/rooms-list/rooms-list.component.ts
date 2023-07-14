import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { RoomList } from '../rooms';

@Component({
  selector: 'hinv-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsListComponent implements OnInit, OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['title']) {
      this.title = changes['title'].currentValue.toUpperCase();
    }
  }
  @Input() rooms: RoomList[] = [];
  @Input() title: string = 'test';
  @Input() price = 0;
  @Output() selectedRoom = new EventEmitter<RoomList>();
  @Output() selectedRoomForDeletion = new EventEmitter<RoomList>();

  ngOnInit(): void {}
  selectRoom(room: RoomList) {
    this.selectedRoom.emit(room);
  }
  deleteRoom(room: RoomList) {
    this.selectedRoomForDeletion.emit(room);
  }
}
