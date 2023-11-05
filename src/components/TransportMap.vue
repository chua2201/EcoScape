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
      </div>
      

      <!-- <div class="col-lg-8 col-md-12 map ps-5 mb-3">
        <TransportGoogleMap v-if="activeTab !== 'bicycle' && activeTab !== 'ev'"/>
      </div> -->

        <!-- MRT Information -->
        <!-- <div v-if="activeTab === 'mrt'">
          <ul v-if="mrtData.length > 0">
            <li v-for="alert in mrtData" :key="alert.ID">
              <p><strong>Status:</strong> {{ alert.status === '1' ? 'Normal' : 'Disrupted' }}</p>
              <p><strong>Line Affected:</strong> {{ alert.lineAffected }}</p>
            </li>
          </ul>
        </div> -->

      </div>

      <div v-if="activeTab === 'bicycle'">
        <div class="col-12">
          <iframe src="https://www.google.com/maps/d/embed?mid=1glqXMZpL-qC-n473PaPzV8kV1E0&hl=en_US&ehbc=2E312F" style="width: 100%; height: 75vh; margin-bottom: 10px;"></iframe>
        </div>
      </div>

      <div v-if="activeTab === 'ev'">
        <div class="col-12">
          <iframe src='https://www.plugshare.com/widget2.html?latitude=1.352083&longitude=103.819836&spanLat=0.17348&spanLng=0.17348&plugs=1,2,3,4,5,6,42,13,7,8,9,10,11,12,14,15,16,17' allow='geolocation' style="width: 100%; height: 75vh; margin-bottom: 10px;"></iframe> 
        </div>
      </div>

      <div v-if="activeTab === 'bus'">
        <div class="col-12">
          <BusStops />
        </div>
      </div>

      <div v-if="activeTab === 'mrt'">
        <div class="col-12">
          <Mrt />
        </div>
      </div>

    </div>
        


</template>

<script>
import { ref } from 'vue';
// import axios from "axios";

// import TransportGoogleMap from "./TransportGoogleMap.vue";
import BusStops from './BusStops.vue';
import Mrt from './Mrt.vue';

export default {
  props: {
  setPlace: Function,
},
  components: {
    // TransportGoogleMap,
    BusStops,
    Mrt
},
  setup() {
    const activeTab = ref('bicycle');
    
    return {
      activeTab,

    };
  },
};
</script>


<style scoped>

.map{
  left: 5%;
}

#tabs-container {
  color: black;
  margin-top: 5%;
  margin-bottom: 5%;
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
  font-size: 20px;
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

#charger{
  color: #255121;
  text-decoration: underline;
}
</style>