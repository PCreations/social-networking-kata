import { createInMemoryTimelineRepository } from '../adapters/repositories';
import { Timeline, User } from '../domain';
import { createPostMessage } from '../use-cases';

const buildTestTimeline = ({ username, messages }: { username: string, messages: string[] }) => {
  const user = User.named({ name: username });
  const timeline = Timeline.of({ user, messages });

  return timeline;
}

const givenUserWantingToPostNewMessage = ({ username, existingMessages }: { username: string, existingMessages: string[] }) => {
  const timeline = buildTestTimeline({ username, messages: existingMessages });
  const timelineRepository = createInMemoryTimelineRepository({ initialTimeline: timeline });
  const postMessage = createPostMessage({ timelineRepository });

  return {
    user: timeline.getUser(),
    postMessage: ({ message }: { message: string }) => postMessage({ username, message }),
    getEditedTimeline() {
      return timelineRepository.getForUsername({ username });
    }
  }
}


describe('posting a message to a personnal timeline', () => {

  it('should post a message to the personnal empty timeline', async () => {
    // arrange
    const { postMessage, getEditedTimeline, user: Alice } = givenUserWantingToPostNewMessage({
      username: 'Alice',
      existingMessages: []
    });
    
    // act
    await postMessage({ message: 'Coucou le tchat twitch' });

    // assert
    const editedTimeline = await getEditedTimeline();
    expect(editedTimeline).toEqual(Timeline.of({ user: Alice, messages: ['Coucou le tchat twitch'] }));
  });

  it('should post a message with a different user to her\'s empty timeline', async () => {
    // arrange
    const { postMessage, getEditedTimeline, user: Bob } = givenUserWantingToPostNewMessage({
      username: 'Bob',
      existingMessages: []
    });
    
    // act
    await postMessage({ message: 'Coucou c\'est Bob' });

    // assert
    const editedTimeline = await getEditedTimeline();
    expect(editedTimeline).toEqual(Timeline.of({ user: Bob, messages: ['Coucou c\'est Bob'] }));
  });

  it('alice should post a message in her\'s non empty timeline', async () => {
    // arrange
    const { postMessage, getEditedTimeline, user: Alice } = givenUserWantingToPostNewMessage({
      username: 'Alice',
      existingMessages: ['hello world']
    });
    
    // act
    await postMessage({ message: 'comment ça va ?' });

    // assert
    const editedTimeline = await getEditedTimeline();
    expect(editedTimeline).toEqual(Timeline.of({ user: Alice, messages: [
      'hello world',
      'comment ça va ?'
    ] }));
  })
});