import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,AbstractControl, Validators } from '@angular/forms';

// import { validarQueSeanIguales } from './app.validator';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: [ './test2.component.css' ]
})
export class Test2Component implements OnInit {
  formGroup!: FormGroup;
  d1= new Date(Date.UTC(2021,0,1,8));
  dt1:any;
  dt2:any;
  bandera:boolean=true;
  bandera2:boolean=true;
  nota:number=10;
  error:any={isError:false,errorMessage:''};
  
  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.buildForm();
    

  }

  private buildForm() {
    const dateLength = 10;
    const today = new Date().toISOString().substring(0, dateLength);
    const name = '';
    const minPassLength = 1;
    
    this.formGroup = this.formBuilder.group({
      registeredOn: [,[]],
      registeredOn2:"",
      name: [],
      email: ['', [
         
      ]],
      edad:[, []],
      // edad2:[, [Validators.required,Validators.min(1),Validators.max(5)]],      
      edad2:[,[Validators.pattern(/^[a-z\d]+$/)]],
      
      
      password: ['', [
        // this.validatePassword
      ]]
      
      
    });
  }
  
  
  // private passwordsShouldMatch(fGroup: FormGroup) {
     
     
  //    if(fGroup.get('edad')?.value != fGroup.get('edad2')?.value)
  //     return {'mismatch': true};
  //     else
  //     return null
  // }
  
  public validarEdades(fGroup: FormGroup) {     
     
    if(fGroup.get('edad')?.value > fGroup.get('edad2')?.value || fGroup.get('edad')?.value === fGroup.get('edad2')?.value )
     {
     return {'mayor': true};
     }
     else{
     return null
     
     }
     
 }
 
 
  
  // private validatePassword(control: AbstractControl) {
  //   const password = control.value;
  //   // const l2=this.formGroup.get("registeredOn2")
  //   // const aux=this.getErrorName('registeredOn','registeredOn2');
    
  //   let error = null;
  //   if (!password.includes('$')) {
  //     error = {dollar: 'needs a dollar symbol' };
  //   }
  //   if (!parseFloat(password[0])) {
  //     error = {number: 'must start with a number' };
  //   }
  //   return error;
  // }
  
  //------enviar------------
  public register() {
  
    let da:string="";
    
    // console.log(this.formGroup.get("edad2")?.value)
    // da=this.formGroup.get("edad2")?.value.replace(/\s/g, "");
    // this.formGroup.get("edad2")?.setValue(da);
    // console.log(this.formGroup.get("edad2")?.value)
    
    // for (const field in this.formGroup.controls) { // 'field' is a string

    //   const control = this.formGroup.get(field); // 'control' is a FormControl  
      
    //   console.log(control?.value)
    // }
    
  
    const user = this.formGroup.value;
    console.log(this.formGroup.get("edad2")?.hasError("edadmenor"))
    if(this.formGroup.valid){
    
    console.log("todo ok se va");
    }
    else{ 
      console.log("faltan campos, no se va");
    }
    
  }
  
  // public eliminarEspacios(control:string){
    
    
  //   this.formGroup.get(control).value.replace(/\s/g, "");
    
  
  // }
  
  
  public age(control: AbstractControl) {
    const value = control.value;
    // const rdo=this.dt1;
    if (value < 18) {
      // if (this.dt1 < this.dt2) {
      return {isYoung: true};
    }
    return null;
  }
  
  
  age2(max: any) {
    return (control: AbstractControl) => {
      const value = control.value;      
      
      if (this.dt1 > this.dt2) {
        return {isYoung: true};
      }
      return null;
    };
  }
  
  public getError(controlName: string): string {
    let error = '';
    const control = this.formGroup.get(controlName);
    if (control?.touched && control.errors != null) {
      error = JSON.stringify(control.errors);
    }
    return error;
  }
  
  public getErrorName(controlName: string, controlName2:string): string {
    let error = '';
    const control = this.formGroup.get('registeredOn');
    const control2 = this.formGroup.get('registeredOn2');    
    
    if (control?.value > control2?.value || control?.value == control2?.value ) {
      error = "Fecha de inicio debe ser menor";
      this.bandera2=true;
      
    }
    else{
    this.bandera2=false;
    error="todo ok";
    }
    
    return error;
  }
  
  public validarTest(controlName: string, controlName2:string) {
    // let error = '';
    const control = this.formGroup.get(controlName);
    const control2 = this.formGroup.get(controlName2);    
    
    if ( control?.value == control2?.value ) {
      // error = "Fecha de inicio debe ser menor";
      control2?.setErrors({'edadmenor':true});
      
    }
    else{
      control2?.setErrors({'edadmenor':false});
    
    }    
    
  }
    
    
  public validarTest2() {
    // let error = '';
    const control = this.formGroup.get("edad1");
    const control2 = this.formGroup.get("edad2");    
    
    if ( control?.value == control2?.value ) {
      // error = "Fecha de inicio debe ser menor";
      control2?.setErrors({'edadmenor':true});
      
      
    }
    else{
      control2?.setErrors({'edadmenor':false});
    
    } 
    console.log(control?.hasError("edadmenor"))
    
  }
  // public validarFecha(): boolean {
     
  //   const control = this.formGroup.get('registeredOn');
  //   const control2 = this.formGroup.get('registeredOn2');    
    
  //   if (control?.value > control2?.value) {
  //            this.bandera2=true;      
  //   }
  //   else{
  //   this.bandera2=false;
  //   }
    
  //   return this.bandera2;
    
     
  // }
  
  // public getErrorFechamenor(controlName: Date, controlName2:Date): boolean {
  //   let error = false;
  //   const control = this.formGroup.get('registeredOn');
  //   const control2 = this.formGroup.get('registeredOn2');    
    
  //   if (control?.value > control2?.value) {
  //     error=true
  //   }
  //   return error;
  // }
  
  
  
}
