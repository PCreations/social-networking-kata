import { Timeline } from "../model";

export interface TimelineRepository {
  getForUsername({ username }: { username: string }): Promise<Timeline.Timeline>
  save(timeline: Timeline.Timeline): Promise<void> 
}