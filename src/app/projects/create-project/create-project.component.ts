import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Status {
  name: string;
}

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent {
  constructor(private fb: FormBuilder, 
              private appService: AppService, 
              private router: Router, 
              private location: Location,
              private _snackBar: MatSnackBar){
      this.createProjectFormGroup = this.fb.group({
      titleCtrl: ['', Validators.required],
      descriptionCtrl: [''],
      statusCtrl: [[]],
      membersCtrl: ['']})
    }

  createProjectFormGroup!: FormGroup;
  allMembers: Array<any> = [];
  loading = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  fixedStatus: Status[] = [{name: 'Backlog'}, {name: 'To do'}, {name: 'Doing'}, {name: 'Done'}];
  addedStatus: Status[] = []
  selectedMemberOptions: Array<any> = [] 

  async ngOnInit() {    
    this.appService.getMembers().subscribe(response => {
      this.allMembers = JSON.parse(response);
      this.loading = false
    });
  }

  onMembersSelectionChange(event: any): void {
    this.selectedMemberOptions.push(event.value);

    const memberCtrl = this.createProjectFormGroup.get('memberCtrl');
    if (memberCtrl) {
      memberCtrl.setValue(this.selectedMemberOptions)
    }
  }

  addStatus(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.addedStatus.push({name: value});
      const statusCtrl = this.createProjectFormGroup.get('statusCtrl');
      if (statusCtrl) {
        statusCtrl.setValue(this.addedStatus);
      }
      this.createProjectFormGroup.patchValue({ statusCtrl: '' });
    }

    event.chipInput!.clear();
  }

  removeStatus(status: Status): void {
    const index = this.addedStatus.indexOf(status);

    if (index >= 0) {
      this.addedStatus.splice(index, 1);
      const statusCtrl = this.createProjectFormGroup.get('statusCtrl');
      if (statusCtrl) {
        statusCtrl.setValue(this.addedStatus)
      }
    }
  }

  onSubmit(): void {
    if (this.createProjectFormGroup.valid) {
      const formValues = this.createProjectFormGroup.value;

      const fixedStatusNames = this.fixedStatus.map(status => status.name);
      
      const allStatus = Array.from(new Set([...fixedStatusNames, ...formValues.statusCtrl]));
      
      formValues.statusCtrl = allStatus;
      
      this.appService.createProject(formValues).subscribe((response) => {
        if (response.code == 400){
          this.openSnackBar(response.error, 'red-snackbar');
        }
        else {
          this.router.navigate(['/projects']);
        }
      })
    }
  }

  goBack(): void {
    this.location.back();
  }

  openSnackBar(message: string, panelClass: string): void {
    this._snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: [panelClass]
    });
  }
}
