import { makeNotification } from 'test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { GetRecipientNotification } from './get-recipient-notification';

describe('Get recipient Notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNoitifications = new GetRecipientNotification(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    const { notifications } = await countRecipientNoitifications.execute(
      makeNotification({ recipientId: 'recipient-2' }),
    );

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-1' }),
        expect.objectContaining({ recipientId: 'recipient-1' }),
      ]),
    );
  });
});
