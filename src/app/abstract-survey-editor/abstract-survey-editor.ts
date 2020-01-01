import ResearchSurvey from '../dto/ResearchSurvey';
import {MatDialogRef} from '@angular/material/dialog';

export class AbstractSurveyEditor {
  private dialogRef: MatDialogRef<any>;
  constructor(dialogRef: MatDialogRef<any>) {
    this.dialogRef = dialogRef;
  }

  showCancel = true;
  showConfirm = true;
  survey: ResearchSurvey;

  onConfirm: (newSurvey: ResearchSurvey) => void = () => {};
  onCancel() {
    this.dialogRef.close();
  }

  onTextChange(value: string) {
    this.survey.text = value;
  }

  onNameChange(value: string) {
    this.survey.name = value;
  }

  onAnswerChange(ans: {val: string}, value: string) {
    this.survey.answers.find(arg => arg === ans).val = value;
  }

  onAnswerAdd() {
    this.survey.answers.push({val: ''});
  }

}
