import { TimelineRepository } from '../../../domain/repositories';

export const createInMemoryTimelineRepository = (): TimelineRepository => {
  const data: Array<string> = [];
  return {
    async saveMessage() {
      data.push('Hello World');
    },
    async getForUser() {
      return data[0];
    }
  }
}