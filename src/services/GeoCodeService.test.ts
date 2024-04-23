import { mock, verifyAll, when } from 'strong-mock';
import {describe, test, expect, afterEach } from 'vitest';
import { GeoCodeClient } from './GeoCodeClient';
import { createGeoCodeService } from './GeoCodeService';
import { AxiosRequestHeaders, AxiosResponse } from 'axios';
import { AddressEntity } from '../models/AddressModel';
import { ApplicationError, GET_ADDRESS_FAILED } from '../components/ApplicationError';

describe('GeoCodeService', () => {
  const lat = 64.1475338;
  const lng = -21.9349374;
  const mockClient = mock<GeoCodeClient>();
  const geoCodeService = createGeoCodeService(mockClient);
  const addressResponseStub = {"place_id":347307436,"licence":"Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright","osm_type":"node","osm_id":2240026732,"lat":"64.1475338","lon":"-21.9349374","display_name":"Lækjartorg B, Hverfisgata, Austurbær, Miðborg, Reykjavik, Capital Region, 101, Iceland","address":{"highway":"Lækjartorg B","road":"Hverfisgata","neighbourhood":"Austurbær","suburb":"Miðborg","city":"Reykjavik","state_district":"Capital Region","ISO3166-2-lvl5":"IS-1","postcode":"101","country":"Iceland","country_code":"is"},"boundingbox":["64.1474838","64.1475838","-21.9349874","-21.9348874"]}
  const apiResponseStub  = {
    status: 200,
    data: addressResponseStub,
    statusText: '',
    headers: {} as AxiosRequestHeaders,
    config: {},
  } as unknown as AxiosResponse<AddressEntity, any>;
  const addressStub = {
    name: "Lækjartorg B, Hverfisgata, Austurbær, Miðborg, Reykjavik, Capital Region, 101, Iceland",
    location: {
      lat,
      lng,
    }
  }

  afterEach(verifyAll);

  test('should get address', async () => {
    when(() => mockClient.getAddress(lat, lng)).thenResolve(apiResponseStub);
    expect(await geoCodeService.getAddress(lat, lng)).toEqual(addressStub);
  });

  test('should throw error', async () => {
    when(() => mockClient.getAddress(lat, lng)).thenReject();

    await expect(() => geoCodeService.getAddress(lat, lng)).rejects.toThrow(
      new ApplicationError(GET_ADDRESS_FAILED)
    );
  });
});