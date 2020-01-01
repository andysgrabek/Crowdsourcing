import ResearchTutorial from '../dto/ResearchTutorial';
import {MatDialogRef} from '@angular/material/dialog';

export abstract class AbstractTutorialEditor {
  private dialogRef: MatDialogRef<any>;
  protected constructor(dialogRefInj: MatDialogRef<any>) {
    this.dialogRef = dialogRefInj;
  }

  showCancel = true;
  showConfirm = true;
  tutorial: ResearchTutorial;
  onConfirm: (newTutorial: ResearchTutorial) => void = () => {};
  onCancel() {
    this.dialogRef.close();
  }

  onTextChange(value: string) {
    this.tutorial.text = value;
  }

  onNameChange(value: string) {
    this.tutorial.name = value;
  }

  onUrlChange(value: string) {
    this.tutorial.url = value;
  }

}
