import { Notification as RawNotification } from '@prisma/client';
import { Content } from 'src/app/entities/content';
import { Notification } from 'src/app/entities/notification';

export class PrismaNotificationsMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      category: notification.category,
      content: notification.content.value,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
    };
  }

  static toDomain(raw: RawNotification): Notification {
    return new Notification(
      {
        category: raw.category,
        content: new Content(raw.content),
        recipientId: raw.recipientId,
        canceledAt: raw.canceledAt,
        createdAt: raw.canceledAt,
        readAt: raw.readAt,
      },
      raw.id,
    );
  }
}
