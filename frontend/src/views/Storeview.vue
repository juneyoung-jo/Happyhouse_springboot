<template>
  <div class="priceview">
    <div class="row">
      <div class="col-sm-12"></div>
    </div>
    <Storeselectbox @GESTORES="getstores" />
    <div class="row">
      <Storelist :aptCodes="aptCodes" />
      <div id="map" class="col-sm-7 map-box no-padding">
        <Map :aptCodes="aptCodes" />
      </div>
    </div>
  </div>
</template>
<script>
import Map from '@/components/storeview/Storemap.vue';
import Storeselectbox from '@/components/storeview/Storeselectbox.vue';
import Storelist from '@/components/storeview/Storelist.vue';
export default {
  data() {
    return {
      aptCodes: [],
    };
  },
  components: {
    Map,
    Storeselectbox,
    Storelist,
  },
  methods: {
    getstores(data) {
      this.aptCodes = data;
    },
  },
};
</script>
<style>
.priceview {
  background-color: #ffffff;
  height: 600px;
}

.map-box {
  height: 600px;
}
</style>
