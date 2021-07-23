export interface TimelineRepository {
  getForUser(user: string): Promise<string>
  saveMessage({ message }: { message: string }): Promise<void> 
}