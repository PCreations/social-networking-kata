import { Timeline } from '../../../domain';
import { TimelineRepository } from '../../../domain/repositories';

export const createInMemoryTimelineRepository = ({ initialTimeline }: { initialTimeline?: Timeline.Timeline } = {}): TimelineRepository => {
  const data: Map<string, Timeline.Timeline> = new Map();
  if (initialTimeline) {
    data.set(Timeline.getTimelineUserName(initialTimeline), initialTimeline);
  }
  return {
    async save(timeline) {
      data.set(Timeline.getTimelineUserName(timeline), timeline);
    },
    async getForUsername({ username }) {
      return data.get(username) || Timeline.forUsername({ username });
    }
  }
}