import ResearchStep from '../dto/ResearchStep';
import {MatDialogRef} from '@angular/material/dialog';

export class AbstractStepEditor {
  private dialogRef: MatDialogRef<any>;
  constructor(dialogRef: MatDialogRef<any>) {
    this.dialogRef = dialogRef;
  }

  showCancel = true;
  showConfirm = true;
  step: ResearchStep;
  onConfirm: (newStep: ResearchStep) => void = () => {};
  onCancel() {
    this.dialogRef.close();
  }

  onTextChange(value: string) {
    this.step.text = value;
  }

  onNameChange(value: string) {
    this.step.name = value;
  }

  onUrlChange(value: string) {
    this.step.url = value;
  }

}
