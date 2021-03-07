<template>
  <div>
    <b-modal size="lg" ref="my-modal" hide-footer title="거래 상세정보">
      <!-- Modal body -->
      <template v-if="busItem == ''">
        <h1>근처에 정류장이 없습니다.</h1>
      </template>
      <template v-if="busItem != ''">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>거리[meter]</th>
              <th>정류장 코드</th>
              <th>정류장 이름</th>
              <th>정류장 타입</th>
            </tr>
          </thead>
          <tbody id="mbody" v-for="(bus, index) in paginatedData" :key="index">
            <tr>
              <td>{{ bus.dist }}m</td>
              <td>{{ bus.stationId }}</td>
              <td>{{ bus.stationNm }}</td>
              <td v-if="bus.stationTp == 1">일반형 시내/농어촌버스</td>
              <td v-else-if="bus.stationTp == 2">좌석형 시내/농어촌버스</td>
              <td v-else-if="bus.stationTp == 3">직행좌석형 시내/농어촌버스</td>
              <td v-else-if="bus.stationTp == 4">일반형 시외버스</td>
              <td v-else-if="bus.stationTp == 5">좌석형 시외버스</td>
              <td v-else-if="bus.stationTp == 6">고속형 시외버스</td>
              <td v-else-if="bus.stationTp == 7">마을버스</td>
              <td v-else-if="bus.stationTp == 0">공용</td>
            </tr>
          </tbody>
        </table>
      </template>
      <div class="btn-cover">
        <b-button
          pill
          variant="info"
          :disabled="pageNum === 0"
          @click="prevPage"
          class="page-btn"
        >
          Prev
        </b-button>
        <span class="page-count"
          >{{ this.buslist.length != 0 ? pageNum + 1 : 0 }} /
          {{ pageCount }} 페이지</span
        >
        <b-button
          pill
          variant="info"
          :disabled="pageNum >= pageCount - 1"
          @click="nextPage"
          class="page-btn"
        >
          Next
        </b-button>
      </div>

      <b-button class="mt-3" variant="outline-danger" block @click="hideModal"
        >Close</b-button
      >
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  props: ['bus'],
  data() {
    return {
      pageNum: 0,
      pageSize: 3,
      buslist: '',
      busItem: [],
      token: localStorage.getItem('key'),
      userid: localStorage.getItem('id'),
    };
  },
  watch: {
    bus: {
      deep: true,
      handler(val) {
        const API_KEY = process.env.VUE_APP_APT_DEAL_API_KEY;
        const API_URL =
          'http://ws.bus.go.kr/api/rest/stationinfo/getStationByPos?ServiceKey=' +
          API_KEY +
          '&tmX=' +
          val.apt.lng +
          '&tmY=' +
          val.apt.lat +
          '&radius=500';

        var parseString = require('xml2js').parseString;
        axios
          .get(API_URL)
          .then((response) => {
            var self = this;

            parseString(response.data, function(err, result) {
              self.events = result.ServiceResult.msgBody[0].itemList;

              // this.buslist = result;
            });
            this.buslist = self.events;
            this.busItem = [];
            this.buslist.forEach((element) => {
              let dist = element.dist[0];
              let stationNm = element.stationNm[0];
              let stationId = element.stationId[0];
              let stationTp = element.stationTp[0];
              let bus = {
                dist: dist,
                stationNm: stationNm,
                stationId: stationId,
                stationTp: stationTp,
              };
              this.busItem.push(bus);
            });
          })
          .catch((error) => {
            console.log(error);
          });
        this.$refs['my-modal'].show();
      },
    },
  },
  methods: {
    nextPage() {
      this.pageNum += 1;
    },
    prevPage() {
      this.pageNum -= 1;
    },
    showModal() {
      this.$refs['my-modal'].show();
    },
    hideModal() {
      this.$refs['my-modal'].hide();
    },
  },
  computed: {
    ...mapGetters(['getAccessToken', 'getUserId', 'getUserName']),
    pageCount() {
      let listLeng = this.busItem.length,
        listSize = this.pageSize,
        page = Math.floor((listLeng - 1) / listSize) + 1;
      return page;
    },
    paginatedData() {
      const start = this.pageNum * this.pageSize,
        end = start + this.pageSize;
      return this.busItem.slice(start, end);
    },
  },
};
</script>
<style>
.modal-dialog {
  max-width: 700px;
  margin: 1.75rem auto;
}
.modal-body {
  margin: 0px;
}
.modal-header {
  border-bottom: 1px solid #dee2e6;
}
</style>
