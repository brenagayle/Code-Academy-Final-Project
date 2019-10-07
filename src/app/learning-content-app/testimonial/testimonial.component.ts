
import { Component, OnInit, forwardRef, Input, HostBinding } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TestimonialServiceService } from '../services/testimonial.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TestimonialComponent),
    multi: true
  }]
})
export class TestimonialComponent implements ControlValueAccessor {
  stars: boolean[] = Array(5).fill(false);
  userName: string;
  totalStars: number;
  testimonialName: string;
  textfield: string = '';
  testimonialForm: FormGroup;
  // Allow the input to be disabled, and when it is make it somewhat transparent.

constructor(
  public TestimonalService: TestimonialServiceService, private route: Router, 
  private fb: FormBuilder, public afs: AngularFirestore)
  {
  this.testimonialForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    // totalStars: new FormControl('', [Validators.required]),
    testimonialName: new FormControl('', [Validators.required]),
    textfield: new FormControl('', [Validators.required])
  });
}

  @Input() disabled = false;
  @HostBinding('style.opacity')
  // get opacity() {
  //   return this.disabled ? 0.25 : 1;
  // }

  // Function to call when the rating changes.
  onChange = (rating: number) => {};

  // Function to call when the input is touched (when a star is clicked).
  onTouched = () => {};

  get value(): number {
    return this.stars.reduce((total, starred) => {
      this.totalStars = total;
      console.log(this.totalStars);
      return total + (starred ? 1 : 0);
    }, 0);
  }

  rate(rating: number) {
    if (!this.disabled) {
      this.writeValue(rating);
    }
  }

  // Allows Angular to update the model (rating).
  // Update the model and changes needed for the view here.
  writeValue(rating: number): void {
    this.stars = this.stars.map((_, i) => rating > i);
    this.onChange(this.value);
  }

  // Allows Angular to register a function to call when the model (rating) changes.
  // Save the function as a property to call later here.
  registerOnChange(fn: (rating: number) => void): void {
    this.onChange = fn;
  }

  // Allows Angular to register a function to call when the input has been touched.
  // Save the function as a property to call later here.
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Allows Angular to disable the input.
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
onSubmit (){
  this.TestimonalService.createTestimonial(this.testimonialForm.value); 
  this.route.navigate(['/homepage']);
  console.log(this.value);
}
testimonialSubmit() {
  
}
}
