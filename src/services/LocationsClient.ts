import axios, { AxiosResponse } from 'axios'
import { Position } from '../utils/dataForMap'

export type LocationsClient = {
  getLocations: () => Promise<AxiosResponse<Position[], any>>
}

export const locationsClient = {
  async getLocations() {
    try {
      const response = await axios.get(
        `https://example.com/locations`
      )
      return response // This will include the response data, status, and other information
    } catch (error) {
      // Handle or throw the error as needed
      console.error('Error getting user:', error)
      throw error
    }
  },
}
