<template>
  <!-- HEADER -->
  <main class="main">
    <section class="home section" id="home">
      <div class="home__container container grid">
        <div class="home__content grid">
          <div class="home__social"></div>
          <div class="about__container container grid">
            <img :src="image" alt="" class="about__img" />
          </div>
          <div class="home__data">
            <h1 class="home__title">{{ name }}</h1>
            <!-- Edit name -->
            <h3 class="home__subtitle" style="color: #41782b">
              Green Rating: {{ greenScore }}
            </h3>
            <!-- Edit  green rating -->
            <h3 class="home__subtitle" style="color: rgb(252, 177, 3)">
              Rating: {{ rating }}
            </h3>
            <!-- Edit rating  -->
            <p class="home__description">
              <!-- Edit description -->
              {{ description }}
            </p>
            <a :href="url" class="button button-flex">
              <!-- Edit url-->
              Go To Their Website! <i class="uil uil-message button__icon"></i>
            </a>
          </div>
        </div>

        <div class="home__scroll">
          <a href="#services" class="home__scroll-button button--flex">
            <i class="uil uil-mouse-alt home__scroll-mouse"></i>
            <span class="home__scroll-name">Scroll down</span>
            <i class="uil uil-arrow-down home__scroll-arrow"></i>
          </a>
        </div>
      </div>
    </section>

    <!-- MAPS SERVICE SECTION -->
    <section class="services section" id="services">
      <h2 class="section__title">Map</h2>
      <span class="section__subtitle">Where they are located</span>
      <div class="map__container container grid">
        <!-- insert map here and replace the image with the API-->
        <GoogleMap
          v-if="lat !== 0 && long !== 0"
          :lat="lat"
          :long="long"
          :name="name"
        />
      </div>
    </section>
  </main>
</template>

<script>
import axios from "axios";
import GoogleMap from "@/components/GoogleMap.vue";

export default {
  components: {
    GoogleMap,
  },
  props: {
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      image: "",
      url: "",
      name: "",
      greenScore: "",
      rating: "",
      description: "",
      lat: 0,
      long: 0,
    };
  },
  mounted() {
    this.fetchDestinationData();
  },
  methods: {
    async fetchDestinationData() {
      try {
        const response = await axios.get("/restaurant.json"); // Path to the JSON file in the public folder
        const destination = response.data[this.index];
        this.image = "../" + destination.image;
        this.url = destination.url;
        this.name = destination.name;
        this.greenScore = destination.greenScore;
        this.rating = destination.rating;
        this.description = destination.description;
        this.lat = parseFloat(destination.lat);
        this.long = parseFloat(destination.long);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap");
#map {
  height: 50%;
  width: 50%;
}
:root {
  /* FOR THE COLORS */
  /* --header-height: 3rem; */
  --hue-color: 250;
  --first-color: hsl(
    (var(--hue-color)),
    69%,
    61%
  ); /* can change this later by going to HSL calculator */
  --first-color-alt: #628a5c;
  --first-color-lighter: hsl(var(--hue-color), 92%, 85%);
  --title-color: hsl(var(--hue-color), 8%, 15%);
  --text-color: hsl(var(--hue-color), 8%, 65%);
  --input-color: hsl(var(--hue-color), 70%, 61%);
  --body-color: hsl(var(--hue-color), 60%, 99%);
  --container-color: #fff;

  /* FOR THE FONTS */
  --body-font: "Poppins", sans-serif;
  --big-font-size: 2rem;
  --h1-font-size: 1.5rem;
  --h2-font-size: 1.25rem;
  --h3-font-size: 1.125rem;
  --normal-font-size: 0.938rem;
  --small-font-size: 0.813rem;
  --smaller-font-size: 0.75rem;

  --font-medium: 500;
  --font-semi-bold: 600;

  /* MARGINS */
  --mb-0-25: 0.25rem;
  --mb-0-5: 0.5rem;
  --mb-0-75: 0.75rem;
  --mb-1: 1rem;
  --mb-1-5: 1.5rem;
  --mb-2: 2rem;
  --mb-2-5: 2.5rem;
  --mb-3: 3rem;

  /* Z-INDEX */
  --z-tooltip: 10;
  --z-fixed: 100;
  --z-modal: 1000;
}
/* FONT SIZES FOR LARGE SCREENS */
@media screen and (min-width: 968px) {
  :root {
    --big-font-size: 3rem;
    --h1-font-size: 2.25rem;
    --h2-font-size: 1.5rem;
    --h3-font-size: 1.25rem;
    --normal-font-size: 1rem;
    --small-font-size: 0.875rem;
    --smaller-font-size: 0.813rem;
  }
}
/* BASE */
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
html {
  scroll-behavior: smooth;
}
body {
  margin: 0 0 var(--header-height) 0;
  font-family: var(--body-font);
  font-size: var(--normal-font-size);
  background-color: var(--body-color);
  color: var(--text-color);
}
h1,
h2,
h3,
h4 {
  color: var(--title-color);
  font-weight: var(--font-semi-bold);
}
ul {
  list-style: none;
}
a {
  text-decoration: none;
}
img {
  max-width: 100%;
}

/* CSS CLASSES */
.section {
  padding: 2rem 0 4rem;
}
.section__title {
  font-size: var(--h1-font-size);
}
.section__subtitle {
  display: block;
  font-size: var(--small-font-size);
  margin-bottom: var(--mb-3);
}
.section__title,
.section__subtitle {
  text-align: center;
}
/* LAYOUT */
.container {
  max-width: 768px;
  margin-left: var(--mb-1-5);
  margin-right: var(--mb-1-5);
}
.grid {
  display: grid;
  gap: 1.5rem;
}

/* HOME */

#home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
}
.about__img {
  border-radius: 5%;
}
.home__container {
  gap: 1rem;
}
.home__content {
  grid-template-columns: 0.5fr;
  padding-top: 3.5rem;
  align-items: center;
}
.home__social {
  display: grid;
  grid-template-columns: max-content;
  row-gap: 1rem;
}
.home__social-icon {
  font-size: 1.25rem;
  color: var(--first-color);
}
.home__social-icon:hover {
  color: var(--first-color-alt);
}

.home__data {
  grid-column: 1/3;
}
/* .home__title {
  font-size: var(--big-font-size);
} */
.home__subtitle {
  /* font-size: var(--h3-font-size); */
  color: var(--text-color);
  font-weight: var(--font-medium);
  margin-bottom: var(--mb-0-75);
}
.home__description {
  margin-bottom: var(--mb-2);
}
.home__scroll-button {
  color: var(--first-color);
  transition: 0.3s;
}
.home__scroll-button:hover {
  transform: translateY(0.25rem);
}
.home__scroll-mouse {
  font-size: 2rem;
}
.home__scroll-name {
  font-size: var(--small-font-size);
  color: var(--title-color);
  font-weight: var(--font-medium);
  margin-right: var(--mb-0-25);
}
.home__scroll-arrow {
  font-size: 1.25rem;
}

/* BUTTONS */
.button {
  display: inline-block;
  background-color: #101207; /* can change the color of the button here */
  color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  font-weight: var(--font-medium);
  text-decoration: none;
}
.button:hover {
  background-color: var(--first-color-alt);
}
.button__icon {
  font-size: 1.25rem;
  margin-left: var(--mb-0-25);
  transition: 0.3s;
}
.button--flex {
  display: inline-flex;
  align-items: center;
}
#services {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
}
</style>
