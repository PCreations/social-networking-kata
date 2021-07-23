export class Message {
  private constructor(private readonly text: string) {}

  public getText() {
    return this.text;
  }
}