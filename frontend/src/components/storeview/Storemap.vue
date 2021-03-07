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
        :icon="{ url: selectIcon(m) }"
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

  methods: {
    selectIcon(m) {
      let kind = m.position.kind;
      let ic = '';
      if ('음식' == kind) ic = 'icon38.png';
      else if ('소매' == kind) ic = 'icon60.png';
      else if ('생활서비스' == kind) ic = 'icon19.png';
      else if ('학문/교육' == kind) ic = 'icon2.png';
      else if ('관광/여가/오락' == kind) ic = 'icon56.png';
      else if ('부동산' == kind) ic = 'icon48.png';
      else if ('숙박' == kind) ic = 'icon28.png';
      else if ('스포츠' == kind) ic = 'icon57.png';
      return `https://maps.google.com/mapfiles/kml/pal2/${ic}`;
    },
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
            kind: apt.kind,
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
