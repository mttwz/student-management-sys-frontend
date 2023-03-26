import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css']
})
export class RegisterModalComponent implements OnInit {
  
  @Input() modalId!: String;
  constructor() { }

  ngOnInit(): void {
  }

}
