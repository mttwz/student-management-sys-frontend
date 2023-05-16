import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { Router } from '@angular/router';
import { ErrorCodes } from 'src/app/enum/error-codes';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RegisterModalComponent } from '../modals/register-modal/register-modal.component';
declare var $: any;
declare var bootstrap: any;


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  @ViewChild(RegisterModalComponent) RegisterModalComponent!: RegisterModalComponent;
  selectedModal!: String;

  isLoading: boolean = true;
  public registerForm !: FormGroup;
  errorCode!: any;
  

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthService,private zone: NgZone) { }

  ngOnInit() {

    $(document).on('hidden.bs.modal','#registerModal',  () => {
      this.zone.run(() => {
        this.router.navigate(["login"]);
    });
     

    })

    this.registerForm = this.formBuilder.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      phone: ['', Validators.required],
      birth: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })

    this.isLoading = false;


  
  }

  /**
 * Registers a new user.
 *
 * This method sends a registration request to the authentication service using the provided registration form.
 * If the registration is successful, it displays a success message popup and navigates the user to a designated page.
 * If there is an error during registration, it handles the error and displays an error message based on the error code.
 */
register() {
  // Check if the birth value is present and in the correct format
  if (this.registerForm.value.birth.length > 0 && !this.registerForm.value.birth.includes("T00:00:00Z")) {
    this.registerForm.value.birth = this.registerForm.value.birth + "T00:00:00Z";
  }

  // Call the register method of the authService with the registerForm
  this.authService.register(this.registerForm).subscribe(
    (res) => {
      // Display success message popup
      this.selectedModal = "successfullPopUp";
      var myModal = new bootstrap.Modal(document.getElementById('registerModal'), "show");
      myModal.show();

      // Navigate the user to a designated page
      // Add the necessary code to navigate the user to the desired page
    },
    (err) => {
      // Handle the error and display an error message based on the error code
      let str: keyof typeof ErrorCodes = err.error.apiError;
      this.errorCode = ErrorCodes[str];

      // Add any additional error handling logic as needed
    }
  );
}




 


}
