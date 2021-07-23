import { createInMemoryTimelineRepository } from '../adapters/repositories';
import { createPostMessage } from '../use-cases';

describe('posting a message to a personnal timeline', () => {
  it('should post a message to the personnal timeline', async () => {
    // arrange
    const timelineRepository = createInMemoryTimelineRepository();
    const user = 'Alice';
    const message = 'Hello World';
    const postMessage = createPostMessage({ timelineRepository });

    // act
    await postMessage({ user, message });

    // assert
    const timeline = await timelineRepository.getForUser({user});
    expect(timeline).toEqual('Hello World');
  });

  it('should post a different message to the personnal timeline', async () => {
    // arrange
    const timelineRepository = createInMemoryTimelineRepository();
    const user = 'Alice';
    const message = 'Coucou le tchat twitch';
    const postMessage = createPostMessage({ timelineRepository });
    
    // act
    await postMessage({ user, message });

    // assert
    const timeline = await timelineRepository.getForUser({ user });
    expect(timeline).toEqual('Coucou le tchat twitch');
  });

  it('should post a message with a different user to her\'s timeline', async () => {
    // arrange
    const timelineRepository = createInMemoryTimelineRepository();
    const user = 'Bob';
    const message = 'Coucou c\'est Bob';
    const postMessage = createPostMessage({ timelineRepository });
    
    // act
    await postMessage({ user, message });

    // assert
    const timeline = await timelineRepository.getForUser({ user });
    expect(timeline).toEqual('Coucou c\'est Bob');
  });
});