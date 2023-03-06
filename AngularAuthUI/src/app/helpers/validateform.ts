import { FormControl, FormGroup } from "@angular/forms";

//This method have to display the error on empty login and signup submit button

export default class validateForm{
    static validateAllFormFields(formGroup: FormGroup){
        Object.keys(formGroup.controls).forEach(field =>{
          const control = formGroup.get(field);
          if(control instanceof FormControl){
            control.markAsDirty({onlySelf:true});
          }else if (control instanceof FormGroup){
            this.validateAllFormFields(control)
          }
        })
      }
}