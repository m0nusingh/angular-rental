import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder ,Validators   } from '@angular/forms';
import {AuthService} from "../shared/auth.service";
import {Router,ActivatedRoute } from '@angular/router';


@Component({
  selector: 'bwm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
   loginForm : FormGroup;
   errors:any[] = [];
   notifyMessage:string = '';

  constructor(private fb :FormBuilder,
              private auth: AuthService,
              private router:Router ,
              private route : ActivatedRoute) { }

  ngOnInit() {
    this.initForm();
    this.route.params.subscribe((params)=>{

      if(params['registered']==='true'){
      this.notifyMessage = "You are registered , You can login now";

      }
    })
  }
   
  initForm(){
    this.loginForm = this.fb.group({
      email:["",[Validators.required,
                  Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      password:["",Validators.required]

    })
  }

  isInvalidForm(feildName):boolean{

    return this.loginForm.controls[feildName].invalid && (this.loginForm.controls[feildName].dirty || this.loginForm.controls[feildName].touched); 

  }

  isRequired(feildName):Boolean{
     return this.loginForm.controls[feildName].errors.required;
  }

  login(){
    this.auth.login(this.loginForm.value).subscribe(
      (token)=>{
        this.router.navigate(['/rentals',{registered:true}]); 
      },
      (errorResponse)=>{
        this.errors = errorResponse.error.errors;

      }
    )
  }
}
