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
]
// for starting the service worker run
// npx msw init ./public --save