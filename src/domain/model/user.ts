export class User {
  static create({ name }: { name: string }) {
    return new User(name);
  }

  private constructor(private readonly name: string) {}

  public getName() {
    return this.name;
  }
}