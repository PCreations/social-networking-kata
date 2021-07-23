import { createInMemoryTimelineRepository } from '../adapters/repositories';
import { Timeline, User } from '../domain';
import { createPostMessage } from '../use-cases';

describe('posting a message to a personnal timeline', () => {

  it('should post a message to the personnal empty timeline', async () => {
    // arrange
    const timelineRepository = createInMemoryTimelineRepository();
    const alice = User.create({ name: 'Alice' });
    const message = 'Coucou le tchat twitch';
    const postMessage = createPostMessage({ timelineRepository });
    
    // act
    await postMessage({ user: alice.getName(), message });

    // assert
    const timeline = await timelineRepository.getForUser({ user: alice.getName() });
    expect(timeline).toEqual(Timeline.of({ user: alice, messages: ['Coucou le tchat twitch'] }));
  });

  it('should post a message with a different user to her\'s empty timeline', async () => {
    // arrange
    const timelineRepository = createInMemoryTimelineRepository();
    const bob = User.create({ name: 'Bob' });
    const message = 'Coucou c\'est Bob';
    const postMessage = createPostMessage({ timelineRepository });
    
    // act
    await postMessage({ user: bob.getName(), message });

    // assert
    const timeline = await timelineRepository.getForUser({ user: bob.getName() });
    expect(timeline).toEqual(Timeline.of({ user: bob, messages: [
      'Coucou c\'est Bob',
    ]}));
  });

  it('alice should post a message in her\'s non empty timeline', async () => {
    // arrange
    const alice = User.create({ name: 'alice' });
    const timeline = Timeline.of({ user: alice, messages: ['hello world'] })
    const timelineRepository = createInMemoryTimelineRepository({ initialTimeline: timeline });
    const postMessage = createPostMessage({ timelineRepository });

    // act
    await postMessage({ user: alice.getName(), message: 'comment ça va ?'});
    
    // assert
    expect(timeline).toEqual(Timeline.of({ user: alice, messages: [
      'hello world',
      'comment ça va ?'
    ]}));
  })
});