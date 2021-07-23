import { User } from "./user";

export class Timeline {
  static create({ username, messages }: { username: string, messages: string[] }) {
    return new Timeline(User.named({ name: username }), messages);
  }
  static of({ user, messages }: { user: User, messages: string[]}) {
    return new Timeline(user, messages)
  }

  private constructor(private readonly user: User, private readonly messages: Array<string>) {} 

  public getUser() {
    return this.user;
  }

  public getUserName() {
    return this.user.getName();
  }

  public postMessage({ text }: { text: string }) {
    this.messages.push(text);

    return this;
  }
}