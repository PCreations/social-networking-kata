import { Timeline } from "../model";

export interface TimelineRepository {
  getForUsername({ username }: { username: string }): Promise<Timeline>
  save(timeline: Timeline): Promise<void> 
}