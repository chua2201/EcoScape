<template>
  <div class="animated-text">Discover <span></span></div>
  <div id="tab-container" class="tab-container">
    <div class="container-fluid">
      <div class="col-md-10 col-md-offset-1">
        <input id="tab1" type="radio" name="tabs" checked @click="selectTab('all')"/>
        <label for="tab1">All</label>

        <input id="tab2" type="radio" name="tabs" @click="selectTab('central')"/>
        <label for="tab2">Central</label>

        <input id="tab3" type="radio" name="tabs" @click="selectTab('east')"/>
        <label for="tab3">East</label>

        <input id="tab4" type="radio" name="tabs" @click="selectTab('south')"/>
        <label for="tab4">South</label>

        <input id="tab5" type="radio" name="tabs" @click="selectTab('north')"/>
        <label for="tab5">North</label>

        <input id="tab6" type="radio" name="tabs" @click="selectTab('west')"/>
        <label for="tab6">West</label>

        <CardsRest :selectedTab="selectedTab"/>
      </div>
    </div>
  </div>
</template>
<script>
import CardsRest from "@/components/CardsRest.vue";
export default {
  data() {
    return {
      selectedTab: 'all', // Initialize with 'all' as the default tab
    };
  },
  methods: {
    // Handle tab selection and update selectedTab
    selectTab(tab) {
      this.selectedTab = tab;
    },
  },
  components: {
    CardsRest,
  },
};
</script>
<style scoped>
.animated-text {
  padding: 1.5rem;
  font-weight: 600;
  margin-left: 1.8cm;
  font-size: 1.5rem;
  color: black;
}
.animated-text span {
  position: relative;
  font-weight: 500;
}
.animated-text span::before {
  content: "eco-friendly places here!";
  color: #628a5c;
  animation: words 20s infinite;
}
.animated-text span::after {
  content: "";
  background-color: #fff;
  position: absolute;
  width: calc(100% + 8px);
  height: 100%;
  border-left: 3px solid #21321f;
  right: -8px; /* makes the cursor have space between the words */
  animation: cursor 0.6s infinite, typing 20s steps(14) infinite;
}
@keyframes typing {
  10%,
  15%,
  30%,
  35%,
  50%,
  55%,
  70%,
  75%,
  90%,
  95% {
    width: 0;
  }
  5%,
  20%,
  25%,
  40%,
  45%,
  60%,
  65%,
  80%,
  85% {
    width: calc(100% +8px);
  }
}
/* tabs */
#tab-container {
  /* margin-top: 20px;
        margin-bottom: 10px; */
  padding: 1rem;
  margin-left: 2.5rem;
  color: black;
}

.tab-content {
  display: none;
  padding: 20px 0 0;
}

input {
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
