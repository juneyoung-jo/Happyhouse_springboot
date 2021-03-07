<template>
  <div id="chart">
    <vc-donut
      background="white"
      foreground="grey"
      :size="400"
      unit="px"
      :thickness="30"
      has-legend
      legend-placement="top"
      :sections="sections"
      :total="this.totalAvg"
      :start-angle="0"
      :auto-adjust-text-size="true"
      @section-mouseover="handleSectionClick()"
    >
      <p class="davg">시세 평균(동): {{ dongAvg*10000 | price }}원</p>
      <p class="aavg">시세 평균(아파트): {{ aptAvg*10000 | price }}원</p>
    </vc-donut>
    <div class="infotable" v-if="isTable">
      <div class="search_box">{{ aptType }} 정보</div>
      <table class="list_table">
        <col width="10%" />
        <col width="20%" />
        <col width="20%" />
        <col width="20%" />
        <col width="10%" />
        <tr>
          <th>매물 번호</th>
          <th>거래년도</th>
          <th>법정동</th>
          <th>실거래가</th>
          <th>{{ aptType }}명</th>
          <th>지번</th>
        </tr>
        <tr v-for="housedeal in paginatedData" class="nicecolor" :key="housedeal.no">
          <td v-html="housedeal.no"></td>
          <td v-html="housedeal.buildYear"></td>
          <td v-html="housedeal.dong"></td>
          <td>{{ housedeal.dealAmount *10000 | price }}원</td>
          <td v-html="housedeal.aptName"></td>
          <td v-html="housedeal.jibun"></td>
        </tr>
      </table>
    </div>
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
            >{{ pageNum + 1 }} / {{ pageCount }} 페이지</span
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
  </div>
</template>

<script>
import axios from "axios";
const SERVER_URL = process.env.VUE_APP_SERVER_URL;
export default {
  props: ["aptName", "dong"],
  data() {
    return {
         pageNum: 0,
      pageSize: 8,
      dongAvg: 0,
      isTable: false,
      aptAvg: 0,
      aptType: "",
      info: [],
      totalAvg: "",
      sections: [
        {
          label: "시세 평균 (동)",
          value: "",
          color: "red",
        },
        {
          label: "시세 평균(아파트)",
          value: "",
          color: "blue",
        },
      ],
    };
  },
  methods: {
    handleSectionClick() {
      axios
        .get(`${SERVER_URL}/map/showChart/${this.aptName}`)
        .then((response) => {
          this.isTable = true;
          this.info = response.data;

          if (response.aptType == 1) {
            this.aptType = "아파트";
          } else {
            this.aptType = "주택";
          }
        })
        .catch(() => {
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
    nextPage() {
      this.pageNum += 1;
    },
    prevPage() {
      this.pageNum -= 1;
    },
  },
  created() {
    axios
      .get(`${SERVER_URL}/map/getAvg/${this.dong}`)
      .then((response) => {
        this.dongAvg = parseInt(response.data);
        axios
          .get(
            `${SERVER_URL}/map/getAptAvg/${this.aptName}/${this.dong}`
          )
          .then((response) => {
            this.aptAvg = parseInt(response.data);
            this.totalAvg = this.dongAvg + this.aptAvg;
            if (this.totalAvg == 0) {
              alert("데이터가 존재하지않습니다.");
              this.sections[0].color = "grey";
              this.sections[1].color = "grey";
            }
            this.sections[0].value = this.dongAvg;
            this.sections[1].value = this.aptAvg;
          })
          .catch(() => (this.errored = true))
          .finally(() => (this.loading = false));
      })
      .catch(() => (this.errored = true))
      .finally(() => (this.loading = false));
  },
  filters: {
    price(value) {
      if (!value) return value;
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
    computed: {
    pageCount() {
      let listLeng = this.info.length,
        listSize = this.pageSize,
        page = Math.floor((listLeng - 1) / listSize) + 1;
      return page;
    },
    paginatedData() {
      const start = this.pageNum * this.pageSize,
        end = start + this.pageSize;
      return this.info.slice(start, end);
    },
  },

};
</script>
<style >
.davg {
  font-size: 50%;
  color: red;
}
.aavg {
  font-size: 50%;
  color: blue;
}
#chart {
  /* overflow: hidden; */
  background-color: white;
  height: auto;
}

.search_box {
  width: 98%;
  border-width: 1px;
  border-style: solid;
  border-color: #efefef;
  background-color: #ffffff;
  padding: 2px;
  padding-top: 7px;
  padding-bottom: 7px;
  margin-top: 5px;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5px;
  margin-bottom: 10px;
  text-align: center;
  line-height: 2.1em;
}
.list_table {
  width: 98%;
  border-bottom: 1px solid #efefef;
  border-right: 1px solid #efefef;
  border-collapse: collapse;
  margin-left: auto;
  margin-right: auto;
  clear: both;
}
.list_table td,
.list_table th {
  text-align: center;
  border-top: 1px solid #efefef;
  border-left: 1px solid #efefef;
  padding: 0.3em;
}
.list_table th {
  background-color: #4d6bb3;
  color: #ffffff;
  line-height: 1.7em;
  font-weight: normal;
}
.list_table tr td {
  padding-top: 0.5em;
  padding-bottom: 0.5em;
}
.list_table td.title {
  padding-left: 0.5em;
  text-align: left;
}
.list_table td.title a:hover {
  text-decoration: underline;
}
.list_table th,
.list_table td {
  vertical-align: middle;
}

.list_table select {
  height: 19px;
  border: #cccccc solid 1px;
  vertical-align: middle;
  line-height: 1.8em;
  padding-left: 0px;
}
.list_table select option {
  margin-right: 10px;
}
.list_table .selected_row {
  border: solid 0px #efefef;
}
.list_table .sele {
  padding: 0;
  margin: 0;
}
</style>