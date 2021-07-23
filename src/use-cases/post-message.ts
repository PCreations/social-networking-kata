import { Timeline } from "../domain";
import { TimelineRepository } from "../domain/repositories";

export const createPostMessage = ({ timelineRepository }: { timelineRepository: TimelineRepository }) => async ({ username, message }: { username: string, message: string }) => {
  const timeline: Timeline.Timeline = await timelineRepository.getForUsername({ username })
  const editedTimeline = Timeline.postMessage(timeline, { message });

  return timelineRepository.save(editedTimeline);
}