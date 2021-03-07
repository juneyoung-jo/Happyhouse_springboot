<template>
  <div style="text-align: center">
    시도 :
    <select id="sido" v-model="sidocode">
      <option value="0">선택</option>
      <option
        v-for="(sido, index) in sidocodes"
        :key="index"
        :value="sido.sidoCode"
        >{{ sido.sidoName }}</option
      >
    </select>
    구군 :
    <select id="gugun" v-model="guguncode">
      <option value="0">선택</option>
      <option
        v-for="(gugun, index) in guguncodes"
        :key="index"
        :value="gugun.gugunCode"
        >{{ gugun.gugunName }}</option
      >
    </select>
    읍면동 :
    <select id="dong" v-model="dongcode">
      <option value="0">선택</option>
      <option
        v-for="(dong, index) in dongcodes"
        :key="index"
        :value="dong.dong"
      >
        {{ dong.dong }}</option
      >
    </select>
  </div>
</template>
<script>
import axios from 'axios';
const SERVER_URL = process.env.VUE_APP_SERVER_URL;

export default {
  data() {
    return {
      sidocodes: [],
      sidocode: '0',
      guguncodes: [],
      guguncode: '0',
      dongcodes: [],
      dongcode: '0',
    };
  },
  mounted() {
    //시도
    axios
      .get(`${SERVER_URL}/storeInterest/sido`)
      .then((response) => (this.sidocodes = response.data))
      .catch(() => (this.errored = true))
      .finally(() => (this.loading = false));
  },
  watch: {
    //시도를 선택했을 때,
    sidocode(val) {
      this.guguncode = '0';
      if (val != 0) {
        axios
          .get(`${SERVER_URL}/storeInterest/gugun/${val}`)
          .then((response) => (this.guguncodes = response.data))
          .catch(() => (this.errored = true))
          .finally(() => (this.loading = false));
      }
    },

    //구군을 선택했을 때,
    guguncode(val) {
      if (val != 0) {
        this.dongcode = '0';
        axios
          .get(`${SERVER_URL}/storeInterest/dong/${val}`)
          .then((response) => (this.dongcodes = response.data))
          .catch(() => (this.errored = true))
          .finally(() => (this.loading = false));
      }
    },

    // 동을 선택했을 때, 리스트 출력
    dongcode(val) {
      if (val != 0) {
        if (val != 0) {
          axios
            .get(`${SERVER_URL}/storeInterest/store/${val}`)
            .then((response) => {
              this.$emit('GESTORES', response.data);
              //   this.$store.commit('GETAPTCODES', response.data);
              //   this.aptcodes = response.data;
              //   this.geocode();
            })
            .catch(() => (this.errored = true))
            .finally(() => (this.loading = false));
        }
      }
    },
  },
};
</script>
<style></style>
