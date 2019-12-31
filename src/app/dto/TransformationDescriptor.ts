export default class TransformationDescriptor {

  name: string;
  extension: string;

  constructor(name: string, extension?: string) {
    this.name = name;
    this.extension = extension || 'data';
  }

}
