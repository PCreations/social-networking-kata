import { Timeline } from "../domain";
import { TimelineRepository } from "../domain/repositories";


interface PostMessageCommand {
  user: string;
  message: string;
}

interface PostMessageFactoryOptions {
  timelineRepository: TimelineRepository
}

export const createPostMessage = ({ timelineRepository }: PostMessageFactoryOptions) => async (postMessageCommand: PostMessageCommand) => {
  let timeline: Timeline;
  timeline = await timelineRepository.getForUser({ user: postMessageCommand.user }) as Timeline;
  if (!timeline) {
    timeline = Timeline.create({ user: postMessageCommand.user, message: '' });
  }

  const editedTimeline = timeline.postMessage({ text: postMessageCommand.message });

  return timelineRepository.save(editedTimeline);
}