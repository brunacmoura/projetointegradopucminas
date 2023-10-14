import { Component } from '@angular/core';
import { ProjectInfoService } from '../../project-info.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent {
  constructor(private projectInfoService: ProjectInfoService,
              private location: Location,
              private fb: FormBuilder,
              private appService: AppService) {
                this.editTaskFormGroup = this.fb.group({
                  titleCtrl: ['', Validators.required],
                  descriptionCtrl: [''],
                  responsibleCtrl: ['', Validators.required],
                  deliveryDateCtrl: [],
                  tagCtrl: ['', Validators.required],  })
              }

  editTaskFormGroup!: FormGroup;
  task: any;
  loading: boolean = true;
  allMembers: Array<any> = [];
  allTags: Array<string> = [];
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  selectedMemberOptions: Array<any> = [] 
  project: any;
  originalValues: any;

  ngOnInit() {
    this.projectInfoService.currentTask.subscribe(task => {
      this.task = task;
      this.initializeForm();
    });
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

  initializeForm(): void {
    if (this.task) {
      const formattedDeliveryDate = this.task.delivery_date ? new Date(this.task.delivery_date).toISOString().split('T')[0] : null;
      this.originalValues = {
        titleCtrl: this.task.title || '',
        descriptionCtrl: this.task.description || '',
        responsibleCtrl: this.task.owner.$id || null,
        deliveryDateCtrl: formattedDeliveryDate || null,
        tagCtrl: this.task.tag || '',
      };

      this.editTaskFormGroup.patchValue(this.originalValues);
    }
  }

  onSubmit(): void {
    if (this.editTaskFormGroup.valid) {
      const formValues = this.editTaskFormGroup.value;
      const changedFields: any = {};

      Object.keys(formValues).forEach(key => {
        if (this.originalValues[key] !== formValues[key]) {
          changedFields[key] = formValues[key];
        }
      });

      if (Object.keys(changedFields).length > 0){
        this.appService.editTask(changedFields, this.task._id).subscribe(() => {
          this.location.back();
        })
      }

    }
  }

  goBack(): void {
    this.location.back();
  }

}
