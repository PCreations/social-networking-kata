export class User {
  static named({ name }: { name: string }) {
    return new User(name);
  }

  private constructor(private readonly name: string) {}

  public getName() {
    return this.name;
  }
}