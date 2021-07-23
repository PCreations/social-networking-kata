import { TimelineRepository } from '../../../domain/repositories';

export const createInMemoryTimelineRepository = (): TimelineRepository => {
  const data: Array<string> = [];
  return {
    async saveMessage({ message }) {
      data.push(message);
    },
    async getForUser() {
      return data[0];
    }
  }
}