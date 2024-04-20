import axios from 'axios';
import { AxiosResponse } from 'axios';
import { AddressEntity } from '../models/AddressModel';

export type GeoCodeClient = {
  getAddress: (lat: number, lng: number) => Promise<AxiosResponse<AddressEntity, any>>;
}

const apikey = import.meta.env.VITE_GEO_CODE_API_KEY;

// The service layer encapsulates the logic for making API requests using Axios. It abstracts away the details of API endpoints, request configurations, and error handling. This layer allows us to centralize API-related code and reuse it throughout the application.The service layer encapsulates the logic for making API requests using Axios. It abstracts away the details of API endpoints, request configurations, and error handling. This layer allows us to centralize API-related code and reuse it throughout the application.

export const geoCodeClient: GeoCodeClient = {
  async getAddress(lat, lng) {
    try {
      const response = await axios.get(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}&api_key=${apikey}`);
      return response; // This will include the response data, status, and other information
    } catch (error) {
      // Handle or throw the error as needed
      console.error('Error getting address:', error);
      throw error;
    }

  }
}

