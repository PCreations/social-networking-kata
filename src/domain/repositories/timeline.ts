export interface TimelineRepository {
  getForUser(user: string): Promise<string>
  saveMessage(): Promise<void> 
}