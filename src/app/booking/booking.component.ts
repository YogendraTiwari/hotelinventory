import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BookingService } from './booking.service';
import { CustomValidator } from './validators/custom-validator';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'hinv-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;

  get guests() {
    return this.bookingForm.get('guests') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('on NG itint');
    // const id$ = this.router.paramMap.pipe(
    //   map((params) => params.get('roomid'))
    // );

    const roomId = this.route.snapshot.paramMap.get('roomid');
    this.bookingForm = this.fb.group(
      {
        roomId: new FormControl(
          { value: roomId, disabled: true },
          Validators.required
        ), // There are two way to create form
        guestEmail: [
          '',
          {
            updateOn: 'blur',
            validators: [Validators.required, Validators.email],
          },
        ],
        checkinDate: [''],
        checkoutDate: [''],
        bookingStatus: [''],
        bookingAmount: [''],
        bookingDate: [''],
        mobileNumber: ['', { updateOn: 'blur' }],
        guestName: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            CustomValidator.validateName,
            CustomValidator.validateSpecialChar('*'),
          ],
        ],
        address: this.fb.group({
          addressLine1: ['', [Validators.required]],
          addressLine2: [''],
          City: ['', [Validators.required]],
          State: ['', [Validators.required]],
          Country: [''],
          ZipCode: [''],
        }),
        guests: this.fb.array([
          this.fb.group({
            guestName: ['', [Validators.required]],
            age: new FormControl(''),
          }),
        ]),
        tnc: new FormControl(false, { validators: [Validators.requiredTrue] }),
      }, // Change will call only on we are moving out of text field
      {
        updateOn: 'blur',
        Validators: [CustomValidator.validatedate],
      }
    );
    this.getBookingData();

    // Observe value change for the form
    this.bookingForm.valueChanges.subscribe((data) => {
      console.log(data);
    });
  }

  getBookingData() {
    // In setValue we need to provide value for each control
    // With patch value we can set it specific properties
    // this.bookingForm.setValue({
    this.bookingForm.patchValue({
      guestEmail: 'test@gmail.com',
      checkinDate: new Date('13-Jul-2023'),
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      address: {
        addressLine1: '',
        addressLine2: '',
        City: '',
        State: '',
        Country: '',
        ZipCode: '',
      },
      guests: [],
      tnc: false,
    });
  }

  addGuest() {
    this.guests.push(
      this.fb.group({
        guestName: new FormControl(''),
        age: new FormControl(''),
      })
    );
  }

  addBooking() {
    console.log(this.bookingForm.value);
    this.bookingService.bookRoom(this.bookingForm).subscribe((data) => {
      console.log(data);
    });
  }
  addPassport() {
    this.bookingForm.addControl('passport', new FormControl(''));
  }
  deletePassport() {
    if (this.bookingForm.get('passport')) {
      this.bookingForm.removeControl('passport');
    }
  }
  RemoveGuest(index: number) {
    this.guests.removeAt(index);
  }
}
