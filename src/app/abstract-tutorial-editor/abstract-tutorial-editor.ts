import ResearchTutorial from '../dto/ResearchTutorial';

export abstract class AbstractTutorialEditor {
  showCancel = true;
  showConfirm = true;
  tutorial: ResearchTutorial;
  onConfirm: (newTutorial: ResearchTutorial) => void = () => {};
  onCancel: () => void = () => {};

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
