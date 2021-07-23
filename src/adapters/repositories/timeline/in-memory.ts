import { Timeline } from '../../../domain';
import { TimelineRepository } from '../../../domain/repositories';

export const createInMemoryTimelineRepository = ({ initialTimeline }: { initialTimeline?: Timeline } = {}): TimelineRepository => {
  const data: Map<string, Timeline> = new Map();
  if (initialTimeline) {
    data.set(initialTimeline.getUserName(), initialTimeline);
  }
  return {
    async save(timeline: Timeline) {
      data.set(timeline.getUserName(), timeline);
    },
    async getForUsername({ username }) {
      return data.get(username) || Timeline.create({ username, messages: [] });
    }
  }
}