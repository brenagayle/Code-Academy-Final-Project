import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {  UploaderService } from '../services/uploader.service'
import { Router } from '@angular/router';


@Component({
  selector: 'uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent {

  exampleForm: FormGroup;

  isHovering: boolean;

  files: File[] = [];

  fileInfo: Object[] = [];

  // validation_messages = {
  //   'title': [
  //     { type: 'required', message: 'Title is required.' }
  //   ],
  //   'description': [
  //     { type: 'required', message: 'Description is required.' }
  //   ]
  // };

  constructor(private fb: FormBuilder, private router: Router, public UploaderService: UploaderService) {
    const form = new FormGroup({
        title: new FormControl(),
        description: new FormControl(),
        embed: new FormControl()
      });
    }

    ngOnInit() {
      this.createForm();
    }

    createForm() {
      this.exampleForm = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        embed: ['']
      });
    }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  resetFields(){
    this.exampleForm = this.fb.group({
      title: new FormControl(''),
      description: new FormControl(''),
      embed: new FormControl('')
    });
  }
  // onDrop - On placing a file in the uploader, this event is triggered. For every item (file) in event, pushes to files array
  onDrop(event: FileList) {
    for (let i = 0; i < event.length; i++) {
      this.files.push(event.item(i));
    }
    console.log('onDrop happened');
  }

  addFile(file){
    this.fileInfo.push(file)
  }

  onSubmit(){
    this.UploaderService.createFile(this.exampleForm.value, this.fileInfo)
    // onSubmit takes file and form and submits to database
    .then(
      res => {
        console.log(res);
        this.resetFields();
        this.router.navigate(['/learning/content']);
    console.log('onSubmit happened');
      }).catch(err=> console.log(err)).finally(() => console.log('done'))

  }
}
