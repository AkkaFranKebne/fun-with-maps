export type AddressEntity = {
  place_id: number
  licence: string
  osm_type: string
  osm_id: number
  lat: string
  lon: string
  display_name: string
  address: {
    highway: string
    road: string
    neighbourhood: string
    suburb: string
    city: string
    state_district: string
    'ISO3166-2-lvl5': string
    postcode: string
    country: string
    country_code: string
  }
  boundingbox: string[]
}
