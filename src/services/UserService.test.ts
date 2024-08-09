import { afterEach, describe, expect } from 'vitest';
import { mock, verifyAll, when } from 'strong-mock';
import { AxiosRequestHeaders, AxiosResponse } from 'axios';
import { ApplicationError, GET_USER_FAILED } from '../components/ApplicationError';
import { UserClient } from './UserClient';
import { createUserService } from './UserService';

describe('UserService', (test) => {
  const positionResponseStub = { lat: 1, lng: 2 };

  const apiResponseStub = {
    status: 200,
    data: positionResponseStub,
    statusText: '',
    headers: {} as AxiosRequestHeaders,
    config: {},
  } as unknown as AxiosResponse<any, any>
  
  const mockClient = mock<UserClient>();
  const userService = createUserService(mockClient)

  afterEach(verifyAll)
  test('should get a position', async () => {
    

    when(() => mockClient.getUser()).thenResolve(apiResponseStub)

    expect(await userService.getUser()).toEqual(positionResponseStub)
  });

  test('should throw error', async () => {
    when(() => mockClient.getUser()).thenReject()

    await expect(() => userService.getUser()).rejects.toThrow(
      new ApplicationError(GET_USER_FAILED)
    )
  })
});