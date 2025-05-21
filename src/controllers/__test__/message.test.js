import { getMessages } from '../message.mjs';
import { Message } from '../../modals/Message.mjs';

jest.mock('../../modals/Message.mjs');

describe('getMessages controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      validatedData: {
        customerRefId: 'customer123',
        start: 0,
        limit: 2,
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 404 if no messages are found', async () => {
    Message.find.mockReturnValue({
      sort: () => ({
        skip: () => ({
          limit: () => ({
            lean: () => [],
          }),
        }),
      }),
    });

    await getMessages(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'No messages found' });
  });

  it('should return 200 and messages if found', async () => {
    const fakeMessages = [
      { text: 'Hi', createdAt: new Date() },
      { text: 'Hello', createdAt: new Date() },
    ];

    Message.find.mockReturnValue({
      sort: () => ({
        skip: () => ({
          limit: () => ({
            lean: () => fakeMessages,
          }),
        }),
      }),
    });

    await getMessages(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeMessages.reverse());
  });

  it('should return 500 on error', async () => {
    Message.find.mockImplementation(() => {
      throw new Error('DB error');
    });

    await getMessages(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'DB error' });
  });
});
