import { TODO_ITEM_CATEGORIES } from '@/libs/database';
import { faker } from '@faker-js/faker';
import { shuffle } from 'lodash';

export function generateMockTodoItem() {
    return {
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        // Randomly set the due date to be in the future or in the past
        dueDate:
            Math.random() > 0.5
                ? faker.date.soon({
                      days: 60,
                  })
                : faker.date.recent({
                      days: 60,
                  }),
        done: Boolean(Math.random() > 0.5),
        category: shuffle(TODO_ITEM_CATEGORIES)[0],
    };
}
