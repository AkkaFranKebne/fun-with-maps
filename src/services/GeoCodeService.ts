import {
  ApplicationError,
  GET_ADDRESS_FAILED,
} from '../components/ApplicationError'
import { MapPointType } from '../utils/dataForMap'
import { GeoCodeClient, geoCodeClient } from './GeoCodeClient'

type GeoCodeService = {
  getAddress: (lat: number, lng: number) => Promise<MapPointType>
}

// The data layer acts as an intermediary between the components and the service layer. Its primary responsibility is to manage data retrieval, transformation, and caching.

export const createGeoCodeService = (
  client: GeoCodeClient
): GeoCodeService => ({
  getAddress: async (lat, lng) => {
    try {
      const response = await client.getAddress(lat, lng)
      return {
        name: response.data.display_name,
        location: {
          lat,
          lng,
        },
      }
    } catch (error) {
      console.log(error)
      throw new ApplicationError(GET_ADDRESS_FAILED)
    }
  },
})

export const geoCodeService = createGeoCodeService(geoCodeClient)
