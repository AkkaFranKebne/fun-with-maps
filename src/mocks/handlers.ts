import { http, HttpResponse } from 'msw'
 
export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get('https://example.com/user', () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json({ 
      lat: 64.1472, 
      lng: -21.9398 
    })
  }),
    // Intercept "GET https://example.com/locations" requests...
    http.get('https://example.com/locations', () => {
      // ...and respond to them using this JSON response.
      return HttpResponse.json([
        { lat: 64.1508, lng: -21.9536 },
        { lat: 64.1502, lng: -21.9519 },
        { lat: 64.1475, lng: -21.9347 },
        { lat: 64.1494, lng: -21.9337 },
      ])
    }),
]
// for making the service worker run
// npx msw init ./public --save