<template>
        <div class="search-box">
      <GMapAutocomplete
        placeholder="Search for a location"
        @place_changed="searchPlace"
        v-model="searchInput"
        style="font-size: large; width: 100%"
        class="mb-3"
      ></GMapAutocomplete>
    </div>
    <GMapMap
      :center="center"
      :zoom="15"
      map-type-id="roadmap"
      style="width: 100%; height: 75vh; margin-bottom: 10px;"
    >
      <!-- Add a marker -->
      <GMapMarker v-for="busStop in busStops.value" :key="busStop.BusStopCode"
      :position="{ lat: parseFloat(busStop.Latitude), lng: parseFloat(busStop.Longitude)}" 
    />

    </GMapMap>
  </template>
  
  <script>
  import axios from "axios";
  export default {
    name: 'GoogleMap',
    props: {
      lat: {
        type: Number,
        required: true,
      },
      long: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        center: { lat: 1.284722, lng: 103.865 },
        busStops: []
      };
    },
    mounted() {
      this.fetchBusStopsData();
    },
    methods: {
      async fetchBusStopsData() {
        try {
          const response = await axios.get("../busstops.json");
          const busStopsData = response.data
          console.log(busStopsData.value.length)
          this.busStops = busStopsData;
        } catch(error) {
          console.error("Error fetching data:", error);
        }
      },
      searchPlace(place) {
        // Set the map's center to the selected place
        this.center = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
      },

    }
  };
  </script>
  