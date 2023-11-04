<template>
  <div class="container-fluid tp-map">
    <div class="row">
      <div class="col-lg-4 col-md-12">
        <div id="tabs-container">
          <!-- Bicycle Tab -->
          <input
            id="tab1"
            type="radio"
            name="tabs"
            checked
            v-model="activeTab"
            value="bicycle"
          />
          <label for="tab1">Bicycle</label>

          <!-- EV Tab -->
          <input id="tab2" type="radio" name="tabs" v-model="activeTab" value="ev" />
          <label for="tab2">EV</label>

          <!-- Bus Tab -->
          <input id="tab3" type="radio" name="tabs" v-model="activeTab" value="bus" />
          <label for="tab3">Bus</label>

          <!-- MRT Tab -->
          <input id="tab4" type="radio" name="tabs" v-model="activeTab" value="mrt" />
          <label for="tab4">MRT</label>
        </div>

        <form>
          <div class="form-group">
            <span class="p-4 fw-bold">Enter Your Location</span>
            <br>
            <input type="text" class="form-control ms-4" v-model="address" placeholder="E.g. Gardens By the Bay">
            <br>
            <button type="button" @click="getFullAddress('addr')" class="btn btn-dark text-white ms-4">Get Full Address!</button>
            <button type="button" @click="getPostCode('postcode')" class="btn btn-dark text-white m-2">Get Postal Code!</button>

            <input type="hidden" id="lat" name="lat" :value="lat" />
            <input type="hidden" id="lng" name="lng" :value="lng" />
          </div>
        </form>

        <!-- Bicycle Information -->
        <div v-if="activeTab === 'bicycle'">
          <ul>
            <li v-for="parking in bicycleParkingData" :key="parking.ID">
              <p><strong>Description:</strong> {{ parking.Description }}</p>
              <p><strong>Latitude:</strong> {{ parking.Latitude }}</p>
              <p><strong>Longitude:</strong> {{ parking.Longitude }}</p>
            </li>
          </ul>
        </div>

        <!-- EV Information -->
        <div v-if="activeTab === 'ev'">
          <ul>
            <li v-for="carpark in carParksData" :key="carpark.CarParkID">
              <p><strong>Car Park ID:</strong> {{ carpark.CarParkID }}</p>
              <p><strong>Area:</strong> {{ carpark.Area }}</p>
            </li>
          </ul>
        </div>

        <!-- Bus Information -->
        <div v-if="activeTab === 'bus'">
          <ul v-if="filteredBusStops.length > 0">
            <li v-for="busStop in filteredBusStops" :key="busStop.BusStopCode">
              <p><strong>Bus Stop Code:</strong> {{ busStop.BusStopCode }}</p>
              <p><strong>Road Name:</strong> {{ busStop.RoadName }}</p>
            </li>
          </ul>
        </div>

        <!-- MRT Information -->
        <div v-if="activeTab === 'mrt'">
          <ul v-if="mrtData.length > 0">
            <li v-for="alert in mrtData" :key="alert.ID">
              <p><strong>Status:</strong> {{ alert.status === '1' ? 'Normal' : 'Disrupted' }}</p>
              <p><strong>Line Affected:</strong> {{ alert.lineAffected }}</p>
            </li>
          </ul>
        </div>

        <p id="display" class="lead text-center">{{ displayInfo }}</p>
      </div>
      <div class="col-lg-6 col-md-12">
        <!-- Use a container to limit the map width -->
        <div class="map-container" id="map">
          <!-- Include your GoogleMap component here -->
          <TransportGoogleMap
            :mapConfig="mapConfig"
            apiKey="AIzaSyAEdK4QmPR7xGkCxDcpoD1GLKBwBL-R0zQ"
          >
          <template slot-scope="{ google, map }">
            {{ map }}
            {{ google }}
          </template>
          </TransportGoogleMap>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
// import axios from "axios";
// import TransportGoogleMap from "./TransportGoogleMap.vue";
// import { mapSettings } from '@/constants/mapSettings';
// //   import { Loader } from "@googlemaps/js-api-loader"
// export default {
//   components: {
//     TransportGoogleMap,
//   },
//   computed: {
//     mapConfig () {
//       return {
//         ...mapSettings,
//         center: { lat: 0, lng: 0 }
//       }
//     },
//   },

  // data() {
  //   return {
  //     address: "",
  //     lat: 1.2973784,
  //     lng: 103.8495219,
  //     title: "Hello SMU",
  //     displayInfo: "",
  //     bicycleParkingData: [],
  //     carParksData: [],
  //     busStopsData: [],
  //     mrtData: [],
  //     activeTab: 'bicycle',
  //   };
  // },
  // computed: {
  //   filteredBusStops() {
  //     // Filter the bus stops based on the user's entered location
  //     if (this.address) {
  //       if (this.locationFilterType === "fullAddress") {
  //         return this.busStopsData.filter((busStop) =>
  //           busStop.RoadName.includes(this.address)
  //         );
  //       } else if (this.locationFilterType === "postalCode") {
  //         return this.busStopsData.filter(
  //           (busStop) => busStop.PostalCode === this.address
  //         );
  //       } else {
  //         // If no address is entered, return all bus stops
  //         var errorMsg = "There are no bus stops nearby!";
  //         return errorMsg;
  //       }
  //     }
  //   },
  //   filteredCarParks() {
  //     if (this.address) {
  //       if (this.locationFilterType === "fullAddress") {
  //         return this.carParksData.filter((carPark) =>
  //           this.address.includes(carPark.area)
  //         );
  //       } else if (this.locationFilterType === "postalCode") {
  //         return this.carParksData.filter(
  //           (carPark) => carPark.PostalCode === this.address
  //         );
  //       }
  //     }
  //   },
  // },
  // methods: {
  //   async initMap() {
  //     console.log("fheuwcdjsik");
  //     const { Map } = google.maps.importLibrary("maps");

  //     map = new Map(document.getElementById("map"), {
  //       center: { lat: -34.397, lng: 150.644 },
  //       zoom: 8,
  //     });
  //   },

  //   initMap() {
  //     this.lat = parseFloat(this.lat);
  //     this.lng = parseFloat(this.lng);
  //     var loc = { lat: this.lat, lng: this.lng };
  //     var map = new google.maps.Map(document.getElementById("map"), {
  //       center: loc,
  //       zoom: 14,
  //     });
  //     // marker, positioned at SIS, SMU
  //     const marker = new google.maps.Marker({
  //       position: loc,
  //       map: map,
  //       title: this.title,
  //     });
  //   },
  //   async getLoc(action) {
  //     var addr = document.getElementById("addr").value;
  //     console.log(addr);
  //     var url = "https://maps.googleapis.com/maps/api/geocode/json";
  //     var key = "AIzaSyDksVIycjBKa9SOthsJq5gbpXpM-DbgBWc";

  //     await axios
  //       .get(url, {
  //         params: {
  //           address: addr,
  //           key: key,
  //         },
  //       })
  //       .then((response) => {
  //         let data = response.data;
  //         console.log("vgrcfedxws");

  //         let info = "";
  //         if (action == "postcode") {
  //           // display postal code, given an address
  //           info = getPostCode(data);
  //         } else {
  //           // display full address, given post code or partial addr
  //           info = getFullAddress(data);
  //         }
  //         console.log(info);

  //         document.getElementById("display").innerText = info;
  //         // refresh the hidden input values with new lat lng coordinates
  //         let coordinate = getLatLng(data);
  //         lat = coordinate["lat"];
  //         lng = coordinate["lng"];
  //         title = "Hello " + addr;
  //         // now refresh the map
  //         initMap();
  //       })
  //       .catch((error) => {
  //         // not a good idea to directly show err.message
  //         // as it may contain sensitive info
  //         // document.getElementById("display").innerText = error.message;
  //         // show a predefined error message string
  //         console.log("error");
  //         document.getElementById("display").innerText =
  //           "Sorry, invalid address. Please try again!";
  //       });
  //   },

  //   getFullAddress(data) {
  //     console.log(data);
  //     var addr = data["results"][0]["formatted_address"];
  //     var loc = getLatLng(data);
  //     return addr + ", lat: " + loc["lat"] + ", lng: " + loc["lng"];
  //   },

  //   getLatLng(data) {
  //     var location = data["results"][0]["geometry"]["location"];
  //     return location;
  //   },

  //   getPostCode(data) {
  //     var addrcomponents = data["results"][0]["address_components"];
  //     var postcode = addrcomponents.filter(postcodeHelper);
  //     // country is an array but there should be only one element
  //     return postcode[0]["long_name"];
  //   },

  //   postcodeHelper(addr) {
  //     return addr["types"][0] == "postal_code";
  //   },

  //   getKeys(data) {
  //     // data["results"][0] is an object
  //     // this gets the keys/properties of results[0] object
  //     var keys = Object.keys(data["results"][0]);
  //     for (key in keys) {
  //       // this prints --
  //       /*  address_components
  //                   formatted_address
  //                   geometry
  //                   place_id
  //                   plus_code
  //                   types */
  //       document.getElementById("display").innerText += key + "; ";
  //     }
  //   },

  //   getCountry(data) {
  //     // this is an array
  //     var addrcomponents = data["results"][0]["address_components"];
  //     // The filter() method creates a new array with array elements that passes a test.
  //     var country = addrcomponents.filter(countryHelper);
  //     // country is an array but there should be only one element
  //     return country[0]["long_name"];
  //   },

  //   countryHelper(addr, index) {
  //     return addr["types"][index] == "country";
  //   },
  //   async getBicycleParkingData() {
  //     const apiUrl =
  //       "http://datamall2.mytransport.sg/ltaodataservice/BicycleParkingv2";
  //     const key = "mcXYAV2rQXOykVpqXBXaxw=="; // Replace with your LTA API key
  //     const latitude = this.lat;
  //     const longitude = this.lng;
  //     const distance = 0.5; // Default radius in kilometers

  //     try {
  //       const response = await axios.get(apiUrl, {
  //         headers: {
  //           AccountKey: key,
  //         },
  //         params: {
  //           latitude,
  //           longitude,
  //           distance,
  //         },
  //       });

  //       this.bicycleParkingData = response.data;
  //     } catch (error) {
  //       console.error("Error fetching bicycle parking data:", error);
  //     }
  //   },
  //   async getCarParksData() {
  //     const apiUrl =
  //       "http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2";
  //     const key = "mcXYAV2rQXOykVpqXBXaxw=="; // Replace with your LTA API key

  //     try {
  //       const response = await axios.get(apiUrl, {
  //         headers: {
  //           AccountKey: key,
  //         },
  //       });

  //       const data = response.data;
  //       this.carParksData = data;
  //     } catch (error) {
  //       console.error("Error fetching car parks data:", error);
  //     }
  //   },
  //   async getBusStopsData() {
  //     const apiUrl = "http://datamall2.mytransport.sg/ltaodataservice/BusStops";
  //     const key = "mcXYAV2rQXOykVpqXBXaxw=="; // Replace with your LTA API key

  //     try {
  //       const response = await axios.get(apiUrl, {
  //         headers: {
  //           AccountKey: key,
  //         },
  //       });

  //       const data = response.data;
  //       this.busStopsData = data;
  //     } catch (error) {
  //       console.error("Error fetching bus stops data:", error);
  //     }
  //   },
  //   async getMRTData() {
  //     const apiUrl =
  //       "http://datamall2.mytransport.sg/ltaodataservice/TrainServiceAlerts";
  //     const key = "mcXYAV2rQXOykVpqXBXaxw=="; // Replace with your LTA API key

  //     try {
  //       const response = await axios.get(apiUrl, {
  //         headers: {
  //           AccountKey: key,
  //         },
  //       });

  //       const data = response.data;
  //       this.mrtData = data;
  //     } catch (error) {
  //       console.error("Error fetching MRT data:", error);
  //     }
  //   },
  // },

  //   created() {
  //     // Load the Google Maps script here if not already loaded
  //     if (typeof google === "undefined") {
  //       const script = document.createElement("script");
  //       script.src =
  //         "https://maps.googleapis.com/maps/api/js?key=AIzaSyAEdK4QmPR7xGkCxDcpoD1GLKBwBL-R0zQ";
  //       script.onload = this.initMap;
  //       document.body.appendChild(script);
  //     } else {
  //       this.initMap();
  //     }

  //     this.getFullAddress();
  //     this.getBicycleParkingData();
  //     this.getCarParksData();
  //     this.getBusStopsData();
  //     this.getMRTData();
  //   },
// };
</script>

<style scoped>

.tp-map{
  min-height: 100vh;
  top: auto;
  bottom: auto;
}
.map-container {
  max-width: 100%; /* Adjust the width as needed */
  height: 100vh; /* Adjust the height as needed */
  overflow: hidden; /* Add scrollbars if the content overflows */
}

#tabs-container {
  color: black;
  margin-top: 5%;
}


#tabs-container input[type="radio"] {
  display: none;
  &:checked {
    & + label {
      color: #bd235d;
    }
  }
}

label {
  display: inline-block;
  padding: 0 25px;
  font-weight: 600;
  &:not(:first-of-type) {
    border-left: 2px solid #628a5c;
    @media screen and (max-width: 480px) {
      border-left: none;
    }
  }
  @media screen and (max-width: 480px) {
    display: block;
  }
  &:hover {
    color: #bd235d;
    cursor: pointer;
  }
}
#tab1 {
  &:checked {
    &~#content1 
            /* & this will refer to the content1` */ {
      display: block;
    }
  }
}
#tab2 {
  &:checked {
    & ~ #content2 {
      display: block;
    }
  }
}
#tab3 {
  &:checked {
    & ~ #content3 {
      display: block;
    }
  }
}
#tab4 {
  &:checked {
    & ~ #content4 {
      display: block;
    }
  }
}
#tab5 {
  &:checked {
    & ~ #content5 {
      display: block;
    }
  }
}
#tab6 {
  &:checked {
    & ~ #content6 {
      display: block;
    }
  }
}
</style>