<template>
  <body>
    <NavBar />
    <TransportSlides />
    <!-- <GoogleMap  v-if="lat !== 0 && long !== 0" :lat="lat" :long="long" :name="name"/> -->
    <!-- <TransportMap /> -->
    <!-- <TpGoogleMap :lat="yourLatValue" :long="yourLongValue" :name="yourNameValue"/> -->
    <TransportMap />
    <Metric />
    <Footer />
  </body>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import TransportSlides from "../components/TransportSlides.vue";
import Metric from "../components/Metric.vue";
import Footer from "@/components/Footer.vue";
import TransportMap from "../components/TransportMap.vue";
// import GoogleMap from "../components/GoogleMap.vue";
// import TpGoogleMap from "../components/TpGoogleMap.vue";

export default {
  name: "Transport",
  data() {
    return {};
  },
  components: {
    NavBar,
    TransportSlides,
    Metric,
    Footer,
    TransportMap,
    // GoogleMap,
    // TpGoogleMap,
  },
};
</script>
