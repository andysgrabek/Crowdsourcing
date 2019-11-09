import ResearchSurvey from '../dto/ResearchSurvey';

export class AbstractSurveyEditor {
  showCancel = true;
  showConfirm = true;
  survey: ResearchSurvey;
  onConfirm: (newSurvey: ResearchSurvey) => void = () => {};
  onCancel: () => void = () => {};

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
