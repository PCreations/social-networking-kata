import { createInMemoryTimelineRepository } from '../adapters/repositories';
import { Timeline, User } from '../domain';
import { createPostMessage } from '../use-cases';

const buildTestTimeline = ({ userName, messages }: { userName: string, messages: string[] }) => {
  const user = User.create({ name: userName });
  const timeline = Timeline.of({ user, messages });

  return timeline;
}

const givenUserWantingToPostNewMessage = ({ userName, existingMessages }: { userName: string, existingMessages: string[] }) => {
  const timeline = buildTestTimeline({ userName, messages: existingMessages });
  const timelineRepository = createInMemoryTimelineRepository({ initialTimeline: timeline });
  const postMessage = createPostMessage({ timelineRepository });

  return {
    user: timeline.getUser(),
    postMessage: ({ message }: { message: string }) => postMessage({ user: userName, message }),
    getEditedTimeline() {
      return timelineRepository.getForUser({ user: userName });
    }
  }
}


describe('posting a message to a personnal timeline', () => {

  it('should post a message to the personnal empty timeline', async () => {
    // arrange
    const { postMessage, getEditedTimeline, user: Alice } = givenUserWantingToPostNewMessage({
      userName: 'Alice',
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
      userName: 'Bob',
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
      userName: 'Alice',
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