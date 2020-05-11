<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>
<script>
import Navbar from "@/components/TheNavbar.vue";
export default {
  name: "App",
  components: {
    Navbar: Navbar
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Merriweather+Sans:ital,wght@0,400;0,700;1,300&display=swap");
#app {
  font-family: "Merriweather Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

input[type="text"] {
  font-family: "Merriweather Sans", sans-serif;
}
</style>
