    // Converts numeric degrees to radians
    function toRad(Value :number) {
            return Value * Math.PI / 180;
    }
    
    //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
    export function useCrowDistance(lat1: number, lng1: number, lat2: number, lng2: number) {
      var R = 6371; // Radius of the earth in km
      var dLat: number = toRad(lat2-lat1);
      var dLon: number = toRad(lng2-lng1);
      var lat1 = toRad(lat1);
      var lat2 = toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c * 1000; // Distance in m
      return d;
    }

