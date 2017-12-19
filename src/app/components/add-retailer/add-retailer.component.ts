import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-retailer',
  templateUrl: './add-retailer.component.html',
  styleUrls: ['./add-retailer.component.css']
})
export class AddRetailerComponent implements OnInit {

  user: User;
  currentUser: User;
  @Output() onAddRetailers = new EventEmitter<boolean>();

  @ViewChild('closeBtn') closeBtn: ElementRef;

  errormessage: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = new User();
  }

  addNewRetailer() {
    console.log('Form is valid and will be submitted');
    this.userService.addNewRetailer(this.user).subscribe(
      user => {
        console.log('Retailer Added successfully');
        this.onAddRetailers.emit();
        this.closeBtn.nativeElement.click();
      },
      error => {
        console.log('Error Happened');
        this.errormessage = 'Error Happened while saving adding the retailer';
      });
  }

}
