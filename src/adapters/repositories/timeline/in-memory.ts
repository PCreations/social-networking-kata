import { TimelineRepository } from '../../../domain/repositories';

export const createInMemoryTimelineRepository = (): TimelineRepository => {
  const data: Map<string, string> = new Map();
  return {
    async saveMessage({ user = 'Alice', message }) {
      data.set(user, message);
    },
    async getForUser({ user }) {
      return data.get(user);
    }
  }
}