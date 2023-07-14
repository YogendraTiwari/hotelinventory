import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsComponent } from './rooms.component';
import { RoomsAddComponent } from './rooms-add/rooms-add.component';
import { RoomBookingComponent } from './room-booking/room-booking.component';

const routes: Routes = [
  {
    path: '',
    component: RoomsComponent,
    children: [
      // { path: ':roomid', component: RoomBookingComponent },
      { path: 'add', component: RoomsAddComponent },
    ],
  },
  {
    path: 'rooms/add',
    component: RoomsAddComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomsRoutingModule {}
