/** this is usedd to generate fake reply to user query  */
import { faker } from '@faker-js/faker';

export const generateFakeReply = () => {
  return faker.helpers.arrayElement([
    faker.lorem.sentence(),
    `Hi there! ${faker.company.catchPhrase()}`,
    `Please wait while we ${faker.hacker.verb()} your request.`,
    `Your ticket ID is ${faker.string.uuid().slice(0, 8)}. We'll update you soon.`,
  ]);
};
