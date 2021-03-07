<template>
  <div class="priceview">
    <div class="row">
      <div class="col-sm-12"></div>
    </div>
    <div class="row">
      <Pricelist
        :aptCodes="aptCodes"
        @getApt="getApt"
        @getRoad="getRoad"
        @bus="getBus"
      />
      <div id="map" class="col-sm-7 map-box no-padding">
        <Map :aptCodes="aptCodes" />
        <Roadview :road="road" />
        <BusList :bus="bus" />
      </div>
    </div>

    <Priceinfo :apt="apt" :aptCodes="aptCodes" :isStarview="isStarview" />
  </div>
</template>
<script>
import Map from '@/components/Map.vue';
import Priceinfo from '@/components/Priceinfo.vue';
import Pricelist from '@/components/Pricelist.vue';
import Roadview from '@/components/Roadview.vue';
import BusList from '@/components/BusList.vue';
import axios from 'axios';

const SERVER_URL = process.env.VUE_APP_SERVER_URL;

export default {
  data() {
    return {
      aptCodes: [],
      apt: '',
      isStarview: false,
      userid: localStorage.getItem('id'),
      user: null,
      road: '',
      bus: '',
    };
  },
  mounted() {
    axios
      .get(`${SERVER_URL}/interest/showStarApi/${this.userid}`)
      .then((res) => {
        this.aptCodes = res.data;

        // if (res.data.msg == 'fail') {
        //   alert('등록실패');
        // } else if (res.data.msg == 'success') {
        //   alert('등록성공');
        // }
      })
      .catch(() => {
        // alert('등록실패');
      })
      .finally(() => (this.loading = false));
  },
  components: {
    Map,
    Priceinfo,
    Pricelist,
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
