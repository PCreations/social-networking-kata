import { Timeline } from "../domain";
import { TimelineRepository } from "../domain/repositories";


export const createPostMessage = ({ timelineRepository }: { timelineRepository: TimelineRepository }) => async ({ username, message }: { username: string, message: string }) => {
  let timeline: Timeline;
  timeline = await timelineRepository.getForUsername({ username }) as Timeline;

  const editedTimeline = timeline.postMessage({ text: message });

  return timelineRepository.save(editedTimeline);
}