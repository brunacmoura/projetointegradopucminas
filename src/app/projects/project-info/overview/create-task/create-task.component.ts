import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Location } from '@angular/common';
import { ProjectInfoService } from '../../project-info.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent {
  constructor(private fb: FormBuilder, 
              private appService: AppService, 
              private location: Location,
              private projectInfoService: ProjectInfoService){
    this.createTaskFormGroup = this.fb.group({
    titleCtrl: ['', Validators.required],
    descriptionCtrl: [''],
    responsibleCtrl: ['', Validators.required],
    deliveryDateCtrl: [],
    tagCtrl: ['', Validators.required],  })
  }

  createTaskFormGroup!: FormGroup;
  allMembers: Array<any> = [];
  allTags: Array<string> = [];
  loading = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  selectedMemberOptions: Array<any> = [] 
  project: any;

  async ngOnInit() {
    this.projectInfoService.project$.subscribe((project) => {
      this.project = project;
    });   
    this.appService.getTags().subscribe(response => {
      this.allTags = response;
    });
    this.appService.getMembers().subscribe(response => {
      this.allMembers = JSON.parse(response);
      this.loading = false
    });
  }


  onSubmit(): void {
    if (this.createTaskFormGroup.valid) {
      const formValues = this.createTaskFormGroup.value;
      formValues.projectId = this.project._id.$oid
      this.appService.createTask(formValues).subscribe(() => {
        this.location.back();
      })
    } else {
      console.log('Invalid form. Some field may be missing or invalid.');
    }
  }

  goBack(): void {
    this.location.back();
  }
}
