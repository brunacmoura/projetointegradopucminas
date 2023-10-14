import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-task-details-dialog',
  templateUrl: './task-details-dialog.component.html',
  styleUrls: ['./task-details-dialog.component.scss']
})
export class TaskDetailsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<TaskDetailsDialogComponent>,
              private appService: AppService){   }

  confirming: boolean = false;

  closeDialog(): void {
    this.dialogRef.close();
  }

  editTask(): void {
    const response = {
      action: 'edit',
      task: this.data
    }
    this.dialogRef.close(response);
  }

  removeTask(): void {
    this.appService.removeTask(this.data._id).subscribe(response => {
      const result = {
        action: 'delete'
      }
      this.dialogRef.close();
    });
  }

  confirmRemove(): void {
    this.confirming = true;
  }

  cancelRemove(): void {
    this.confirming = false;
  }

}
