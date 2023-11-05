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
      <!-- Add a marker for each MrtStation -->
      <GMapMarker
        v-for="MrtStation of MrtStations"
        :key="MrtStation['Station Name']"
        :position="{ lat: parseFloat(MrtStation['Possible Locations'][0].LATITUDE), lng: parseFloat(MrtStation['Possible Locations'][0].LONGITUDE)}"
        @click="openInfoWindow(MrtStation)"
      />
      <GMapInfoWindow
        :opened="openedInfoWindow !== null"
        @closeclick="closeInfoWindow"
      >
        <div>
          <h3>{{ openedInfoWindow ? openedInfoWindow['Station Name'] : '' }}</h3>
        </div>
      </GMapInfoWindow>
    </GMapMap>
  </template>
  
  <script>
  import axios from "axios";
  
  
  export default {
    name: 'MrtInfo',
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
        MrtStations: [],
        openedInfoWindow: null,
      };
    },
    mounted() {
      this.fetchMrtStationsData();
    },
    methods: {
      async fetchMrtStationsData() {
        try {
          const response = await axios.get("../mrt.json");
          const MrtStationsData = response.data;
          this.MrtStations = MrtStationsData;
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      },
      openInfoWindow(MrtStation) {
        this.openedInfoWindow = MrtStation;
      },
      closeInfoWindow() {
        this.openedInfoWindow = null;
      },
      searchPlace(place) {
        // Set the map's center to the selected place
        this.center = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
      },

    },
  };
  </script>
  