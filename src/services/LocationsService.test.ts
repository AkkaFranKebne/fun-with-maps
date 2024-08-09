import { afterEach, describe, expect } from 'vitest';
import { mock, verifyAll, when } from 'strong-mock';
import { createLocationsService } from './LocationsService';
import { LocationsClient } from './LocationsClient';
import { AxiosRequestHeaders, AxiosResponse } from 'axios';
import { ApplicationError, GET_LOCATIONS_FAILED } from '../components/ApplicationError';

describe('LocationsService', (test) => {
  const positionsResponseStub = [{ lat: 1, lng: 2 }, { lat: 3, lng: 4 }];

  const apiResponseStub = {
    status: 200,
    data: positionsResponseStub,
    statusText: '',
    headers: {} as AxiosRequestHeaders,
    config: {},
  } as unknown as AxiosResponse<any, any>
  
  const mockClient = mock<LocationsClient>();
  const locationsService = createLocationsService(mockClient)

  afterEach(verifyAll)
  test('should get an array of positions', async () => {
    

    when(() => mockClient.getLocations()).thenResolve(apiResponseStub)

    expect(await locationsService.getLocations()).toEqual(positionsResponseStub)
  });

  test('should throw error', async () => {
    when(() => mockClient.getLocations()).thenReject()

    await expect(() => locationsService.getLocations()).rejects.toThrow(
      new ApplicationError(GET_LOCATIONS_FAILED)
    )
  })
});