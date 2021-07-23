import { Timeline } from '../../../domain';
import { TimelineRepository } from '../../../domain/repositories';

export const createInMemoryTimelineRepository = (): TimelineRepository => {
  const data: Map<string, Timeline> = new Map();
  return {
    async save(timeline: Timeline) {
      data.set(timeline.getUser().getName(), timeline);
    },
    async getForUser({ user }) {
      return data.get(user);
    }
  }
}