<template>
  <div id="content1" class="tab-content" v-if="selectedTab === 'all'">
    <div class="gallery">
      <Dest
        class="card"
        v-for="(destination, index) of destinations"
        :key="index"
        :name="destination.name"
        :image="destination.image"  
        @click="navigateToUrl(destination.index)"
      ></Dest>
    </div>
  </div>

  <div id="content2" class="tab-content" v-if="selectedTab === 'central'">
    <div class="gallery">
      <Dest
        class="card"
        v-for="(destination, index) of central_dest"
        :key="index"
        :name="destination.name"
        :image="destination.image"
        @click="navigateToUrl(destination.index)"
      ></Dest>
    </div>
    <p v-if="central_dest.length === 0">No green attractions in the Central area.</p>
  </div>

  <div id="content3" class="tab-content" v-if="selectedTab === 'east'">
    <div class="gallery">
      <Dest
        class="card"
        v-for="(destination, index) of east_dest"
        :key="index"
        :name="destination.name"
        :image="destination.image"
        @click="navigateToUrl(destination.index)"
      ></Dest>
    </div>
    <p v-if="east_dest.length === 0">No green attractions in the East area.</p>
  </div>

  <div id="content4" class="tab-content" v-if="selectedTab === 'south'">
    <div class="gallery">
      <Dest
        class="card"
        v-for="(destination, index) of south_dest"
        :key="index"
        :name="destination.name"
        :image="destination.image"
        @click="navigateToUrl(destination.index)"
      ></Dest>
    </div>
    <p v-if="south_dest.length === 0">No green attractions in the South area.</p>
  </div>

  <div id="content5" class="tab-content" v-if="selectedTab === 'north'">
    <div class="gallery">
      <Dest
        class="card"
        v-for="(destination, index) of north_dest"
        :key="index"
        :name="destination.name"
        :image="destination.image"
        @click="navigateToUrl(destination.index)"
      ></Dest>
    </div>
    <p v-if="north_dest.length === 0">No green attractions in the North area.</p>
  </div>

  <div id="content6" class="tab-content" v-if="selectedTab === 'west'">
    <div class="gallery">
      <Dest
        class="card"
        v-for="(destination, index) of west_dest"
        :key="index"
        :name="destination.name"
        :image="destination.image"
        @click="navigateToUrl(destination.index)"
      ></Dest>
    </div>
    <p v-if="west_dest.length === 0">No green attractions in the West area.</p>
  </div>
</template>

<script>
import axios from 'axios';
import Dest from "@/components/Dest.vue";

export default {
  data() {
    return {
      destinations: [],
      central_dest: [],
      north_dest: [],
      south_dest: [],
      east_dest: [],
      west_dest: [],
    };
  },
  props: ['selectedTab'],
  methods: {
  navigateToUrl(destinationIndex) {
    this.$router.push({ name: 'Individual', params: { id: destinationIndex } });
    }
  },
  created() {
    const url = '../destination.json';
    axios
      .get(url)
      .then((response) => {
        const result = response.data;
        this.destinations = result;
        this.destinations.forEach((destination, index) => {
          destination.index = index; // Add the 'index' attribute
        });

        // Populating different areas
        this.central_dest = this.destinations.filter(destination => destination.area[1] === 'central');
        this.north_dest = this.destinations.filter(destination => destination.area[1] === 'north');
        this.south_dest = this.destinations.filter(destination => destination.area[1] === 'south');
        this.east_dest = this.destinations.filter(destination => destination.area[1] === 'east');
        this.west_dest = this.destinations.filter(destination => destination.area[1] === 'west');
      })
      .catch((error) => {
        console.error(error);
      });
  },
  components: {
    Dest
  }
};
</script>

<style scoped>
  /* Your existing component styles here */
  @import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@500&display=swap');


  .gallery {
    display: flex;
    gap: 1.5cm;
    padding-top: 1rem;
  }
  
  @keyframes blink {
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }

 /* tabs */


  input 
  {
    display: none;
    &:checked 
    {
      &+label 
      {
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

  .gallery {
  display: grid;
  grid-template-columns: repeat(6, 1fr); /* Display 3 cards per row by default */
  gap: 20px; /* Adjust the gap between cards */
}


@media (max-width: 1400px) {
  .gallery {
    grid-template-columns: repeat(4, 1fr); /* Display 2 cards per row for medium-sized screens */
  }
  
}
@media (max-width: 992px) {
  .gallery {
    grid-template-columns: repeat(3, 1fr); /* Display 2 cards per row for medium-sized screens */
  }
  
}
@media (max-width: 768px) {
  .gallery {
    grid-template-columns: repeat(2, 1fr); /* Display 2 cards per row for medium-sized screens */
  }
  
}

@media (max-width: 480px) {
  .gallery {
    grid-template-columns: 1fr; /* Display 1 card per row for small screens */
  }
  
}
</style>
