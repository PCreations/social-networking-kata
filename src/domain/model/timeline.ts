import { User } from "./user";

export class Timeline {
  static create({ user, messages }: { user: string, messages: string[] }) {
    return new Timeline(User.create({ name: user }), messages);
  }
  static of({ user, messages }: { user: User, messages: string[]}) {
    return new Timeline(user, messages)
  }

  private constructor(private readonly user: User, private readonly messages: Array<string>) {} 

  public getUser() {
    return this.user;
  }

  public getMessage() {
    return this.messages[0];
  }

  public pushMessage({ message }: { message: string }) {
    this.messages.push(message)
  }

  postMessage({ text }: { text: string }) {
    this.pushMessage({ message: text });

    return this;
  }
}