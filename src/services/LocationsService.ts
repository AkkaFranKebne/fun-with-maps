import {
  ApplicationError,
  GET_LOCATIONS_FAILED,
} from '../components/ApplicationError'
import { Position } from '../utils/dataForMap'
import { LocationsClient, locationsClient } from './LocationsClient'

type LocationsService = {
  getLocations: () => Promise<Position[]>
}

export const createLocationsService = (
  client: LocationsClient
): LocationsService => ({
  getLocations: async () => {
    try {
      const response = await client.getLocations()
      return response.data;
    } catch (error) {
      console.log(error)
      throw new ApplicationError(GET_LOCATIONS_FAILED)
    }
  },
})

export const locationsService = createLocationsService(locationsClient)
