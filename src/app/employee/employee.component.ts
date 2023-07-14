import { Component, Self } from '@angular/core';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'hinv-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  providers: [RoomsService], // Own instance of room service will be provided instead of single instance
})
export class EmployeeComponent {
  empName = 'Yogendra';
  // Self decorator make sure component should not look into parent compoponent
  // for service, if service not available here, generate null exception.
  constructor(@Self() private roomService: RoomsService) {}
}
