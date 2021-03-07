<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Footer from "./views/Footer.vue";
import Header from "./views/Header.vue";
export default {
  name: "app",
  components: {
    Footer,
    Header,
  },
};
</script>

<style>
#app {
  margin: 0px;
  padding: 0px;
  background: #1f1f1f;
  font-family: "Open Sans", sans-serif;
  font-size: 13px;
  color: #4f4f4f;
  height: 100%;
}
</style>
