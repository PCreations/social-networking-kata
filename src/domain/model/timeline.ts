import { User } from "./user";

export class Timeline {
  static create({ user, message }: { user: string, message: string }) {
    return new Timeline(User.create({ name: user }), message);
  }
  private constructor(private readonly user: User, private readonly message: string) {}

  public getUser() {
    return this.user;
  }

  public getMessage() {
    return this.message;
  }

  postMessage({ text }: { text: string }) {
    return Timeline.create({ user: this.user.getName(), message: text });
  }
}