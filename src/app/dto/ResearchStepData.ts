import {ResearchStepType} from './ResearchStep';
import ResearchAnnotation from './ResearchAnnotation';

export default class ResearchStepData {
  startTimeStamp: number;
  endTimeStamp: number;
  stepType: ResearchStepType;
  annotations: ResearchAnnotation[];
  freeComment: string;
}
