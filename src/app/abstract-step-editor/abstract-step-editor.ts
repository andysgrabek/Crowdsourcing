import ResearchStep from '../dto/ResearchStep';

export class AbstractStepEditor {
  showCancel = true;
  showConfirm = true;
  step: ResearchStep;
  onConfirm: (newStep: ResearchStep) => void = () => {};
  onCancel: () => void = () => {};

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
