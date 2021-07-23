import { TimelineRepository } from "../domain/repositories";

interface PostMessageCommand {
  user: string;
  message: string;
}

interface PostMessageFactoryOptions {
  timelineRepository: TimelineRepository
}

export const createPostMessage = ({ timelineRepository }: PostMessageFactoryOptions) => async ({ user, message }: PostMessageCommand) => {
  await timelineRepository.saveMessage({ message });
}