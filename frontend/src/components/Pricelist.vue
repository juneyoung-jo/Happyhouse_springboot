<template>
  <div class="col-sm-5 no-padding" id="pricelist">
    <template v-if="aptCodes == ''">
      <div class="price-row"></div>
      <div class="price-row"></div>
      <div class="price-row"></div>
      <div class="price-row"></div>
      <div class="price-row"></div>
      <div class="price-row"></div>
    </template>
    <table class="table table-hover">
      <tbody>
        <tr v-for="(apt, index) in aptCodes" :key="index">
          <td id="pricetd">
            &nbsp;&nbsp;
            <h3>{{ apt.aptName }}</h3>
            <p>건설연도 : {{ apt.buildYear }}년</p>
            <b-button pill variant="outline-secondary" @click="moreinfo(apt)"
              >자세히 보기</b-button
            >
            <b-button
              pill
              variant="outline-secondary"
              @click="viewAvg(apt)"
              id="viewAvgBtn"
              >시세평균 보기</b-button
            >
            <b-button
              pill
              variant="outline-secondary"
              @click="roadview(apt)"
              id="viewAvgBtn"
              >로드뷰</b-button
            >

            <b-button
              pill
              variant="outline-secondary"
              @click="BusList(apt)"
              id="viewAvgBtn"
              >근처 정류장 보기</b-button
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import Axios from 'axios';
const SERVER_URL = process.env.VUE_APP_SERVER_URL;
export default {
  props: ['aptCodes'],
  data() {
    return {
      count: 0,
      bus: {
        cnt: 1,
        apt: '',
      },

      getRoad: {
        cnt: 1,
        lat: Number,
        lng: Number,
      },
      getApt: {
        cnt: 1,
        apt: '',
      },
      myStyle: {
        backgroundColor: '',
        color: '',
      },
    };
  },
  methods: {
    viewAvg(apt) {
      this.$router.push('/chart/' + apt.aptName + '/' + apt.dong);
    },
    roadview(apt) {
      // console.log(apt.lat, apt.lng);

      if (this.getRoad.cnt == 1) {
        this.getRoad.cnt = 0;
      } else {
        this.getRoad.cnt = 1;
      }
      this.getRoad.lat = apt.lat;
      this.getRoad.lng = apt.lng;
      this.$emit('getRoad', this.getRoad);
    },

    moreinfo(apt) {
      Axios.get(`${SERVER_URL}/map/getCnt/${apt.no}/${apt.aptName}`).then(
        (response) => {
          this.count = response.data;

          if (this.count == null) {
            this.count = 1;
          } else if (this.count != null) {
            this.count = this.count + 1;
          }

          Axios.put(`${SERVER_URL}/map/updateCnt`, {
            no: apt.no,
            aptName: apt.aptName,
            viewCnt: this.count,
          });
        }
      );

      if (this.getApt.cnt == 1) {
        this.getApt.cnt = 0;
      } else {
        this.getApt.cnt = 1;
      }
      this.getApt.apt = apt;
      this.$emit('getApt', this.getApt);
    },

    BusList(apt) {
      if (this.bus.cnt == 1) {
        this.bus.cnt = 0;
      } else {
        this.bus.cnt = 1;
      }
      this.bus.apt = apt;
      this.$emit('bus', this.bus);
    },
  },
};
</script>
<style>
#pricetd {
  border: 1px solid black;
}
.price-row {
  height: 97.4px;
  border: 1px solid black;
  background-color: #ffffff;
  padding-left: 40px;
}
#pricelist {
  height: 600px;
  background-color: white;
  overflow: auto;
  padding-right: 0px;
}
#pricelist::-webkit-scrollbar {
  width: 10px;
}
#pricelist::-webkit-scrollbar-thumb {
  background-color: #2f3542;
}
#pricelist::-webkit-scrollbar-track {
  background-color: grey;
}

#pricetable {
  border-top: 1px solid #dee2e6;
}
#viewAvgBtn {
  margin-left: 10px;
}
</style>
