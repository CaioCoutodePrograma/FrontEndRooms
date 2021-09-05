import { RoomService } from '../room.service';
import { Room } from '../room';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {

  room: Room = new Room();
  submitted = false;
  form;
  constructor(private roomService: RoomService,
    private router: Router) { }

  ngOnInit() {

    this.form = new FormGroup({
      name: new FormControl(this.room.name,[
        Validators.required
      ])
    });

  }

  get name(){return this.form.get('name');}

  newRoom(): void {
    this.submitted = false;
    this.room = new Room();
  }

  save() {
    this.roomService.createRoom(this.room)
      .subscribe(data => console.log(data), error => console.log(error));
    this.room = new Room();
    this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoList() {
    this.router.navigate(['/rooms']);
  }
}
