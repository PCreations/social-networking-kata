export interface TimelineRepository {
  getForUser({ user }: { user: string }): Promise<string | undefined>
  saveMessage({ user, message }: { user: string, message: string }): Promise<void> 
}