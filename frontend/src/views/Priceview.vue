<template>
  <div class="priceview">
    <div class="row">
      <div class="col-sm-12"></div>
    </div>
    <Selectbox @GETAPTCODES="getAptCodes" />
    <div class="row">
      <Pricelist
        :aptCodes="aptCodes"
        @getApt="getApt"
        @getRoad="getRoad"
        @bus="getBus"
      />
      <div id="map" class="col-sm-7 map-box no-padding">
        <Map :aptCodes="aptCodes" />
      </div>
    </div>

    <Priceinfo :apt="apt" :aptCodes="aptCodes" />
    <Roadview :road="road" />
    <BusList :bus="bus" />
  </div>
</template>
<script>
import Map from '@/components/Map.vue';
import Priceinfo from '@/components/Priceinfo.vue';
import Pricelist from '@/components/Pricelist.vue';
import Selectbox from '@/components/Selectbox.vue';
import Roadview from '@/components/Roadview.vue';
import BusList from '@/components/BusList.vue';
export default {
  data() {
    return {
      aptCodes: [],
      apt: '',
      road: '',
      bus: '',
    };
  },
  components: {
    Map,
    Priceinfo,
    Pricelist,
    Selectbox,
    Roadview,
    BusList,
  },
  methods: {
    getRoad(data) {
      this.road = data;
    },
    getAptCodes(data) {
      this.aptCodes = data;
    },

    getApt(data) {
      this.apt = data;
    },
    getBus(data) {
      this.bus = data;
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
