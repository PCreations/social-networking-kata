import { User } from ".";

const createTimeline = ({ user, messages }: { user: User.User, messages: string[] }) => Object.freeze({
  user,
  messages
});

export type Timeline = ReturnType<typeof createTimeline>

export const postMessage = (timeline: Timeline, { message }: { message: string }) => createTimeline({
  ...timeline,
  messages: timeline.messages.concat(message)
});

export const getTimelineUserName = (timeline: Timeline) => timeline.user.name

export const forUsername = ({ username }: { username: string }) => createTimeline({ user: User.createUser({ name: username }), messages: [] });

export const of = ({ user, messages }: { user: User.User, messages: string[] }) => createTimeline({ user, messages });