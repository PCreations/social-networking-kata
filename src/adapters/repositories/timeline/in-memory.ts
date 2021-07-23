import { Timeline } from '../../../domain';
import { TimelineRepository } from '../../../domain/repositories';

export const createInMemoryTimelineRepository = ({ initialTimeline }: { initialTimeline?: Timeline } = {}): TimelineRepository => {
  const data: Map<string, Timeline> = new Map();
  if (initialTimeline) {
    data.set(initialTimeline.getUser().getName(), initialTimeline);
  }
  return {
    async save(timeline: Timeline) {
      data.set(timeline.getUser().getName(), timeline);
    },
    async getForUser({ user }) {
      return data.get(user);
    }
  }
}