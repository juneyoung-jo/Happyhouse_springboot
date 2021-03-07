<template>
  <div>
    <gmap-map
      :center="center.position"
      :zoom="zoom"
      style="width:100%;  height: 400px;"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="(center = m), (zoom = 16)"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
export default {
  name: 'GoogleMap',
  props: ['aptCodes'],
  data() {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: [{ lat: 37.5665734, lng: 126.978179 }],
      zoom: 12,
      markers: [],
      places: [],
      currentPlace: null,
    };
  },
  created() {
    this.center = { position: { lat: 37.5665734, lng: 126.978179 } };
  },

  watch: {
    aptCodes(val) {
      this.markers = [];
      this.zoom = 12;
      for (let apt of val) {
        this.markers.push({
          position: {
            lat: apt.lat * 1,
            lng: apt.lng * 1,
          },
        });
      }
    },
  },
};
</script>
<style scoped>
.vue-map-container {
  position: initial;
}
</style>
