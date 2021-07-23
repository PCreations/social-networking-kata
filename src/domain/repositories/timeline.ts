import { Timeline } from "../model";

export interface TimelineRepository {
  getForUser({ user }: { user: string }): Promise<Timeline | undefined>
  save(timeline: Timeline): Promise<void> 
}