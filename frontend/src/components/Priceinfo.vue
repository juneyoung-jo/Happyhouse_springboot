<template>
  <div>
    <b-modal
      id="modal-lg"
      size="lg"
      ref="my-modal"
      hide-footer
      title="거래 상세정보"
    >
      <!-- Modal body -->
      <template v-if="aptlist == ''">
        <h1>매물이 없습니다.</h1>
      </template>
      <template v-if="aptlist != ''">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>번호</th>
              <th>동이름</th>
              <th>건물명</th>
              <th>시세정보</th>
              <th>유형</th>
              <th>구분</th>
            </tr>
          </thead>
          <tbody id="mbody" v-for="(apt, index) in paginatedData" :key="index">
            <tr>
              <td>{{ apt.no }}</td>
              <td>{{ apt.dong }}</td>
              <td>{{ apt.aptName }}</td>
              <td>{{ (apt.dealAmount * 10000) | price }}원</td>
              <td>{{ apt.aptType == 1 ? '아파트' : '연립다세대' }}</td>
              <td>{{ apt.dealType == 1 ? '매매' : '전/월세' }}</td>
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
          >{{ this.aptlist.length != 0 ? pageNum + 1 : 0 }} /
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
      <template v-if="isStarview == null">
        <b-button
          v-if="token != null"
          class="mt-2"
          variant="outline-warning"
          block
          @click="toggleModal"
        >
          관심매물등록</b-button
        >
      </template>
      <template v-if="isStarview != null">
        <b-button
          v-if="token != null"
          class="mt-2"
          variant="outline-warning"
          block
          @click="deletestar"
        >
          관심매물삭제</b-button
        >
      </template>
      <b-button class="mt-3" variant="outline-danger" block @click="hideModal"
        >Close</b-button
      >
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
const SERVER_URL = process.env.VUE_APP_SERVER_URL;
export default {
  props: ['apt', 'aptCodes', 'isStarview'],
  data() {
    return {
      pageNum: 0,
      pageSize: 3,
      aptlist: [],
      token: localStorage.getItem('key'),
      userid: localStorage.getItem('id'),
    };
  },
  watch: {
    apt: {
      deep: true,
      handler(val) {
        this.aptlist = [];
        axios
          .get(`${SERVER_URL}/map/deal/${val.apt.dong}/${val.apt.aptName}`)
          .then((response) => {
            this.aptlist = response.data;
          })
          .catch(() => (this.errored = true))
          .finally(() => (this.loading = false));
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
    deletestar() {
      axios
        .delete(
          `${SERVER_URL}/interest/delete/${this.apt.apt.no}/${this.userid}`
        )
        .then((res) => {
          if (res.data.msg == 'fail') {
            alert('삭제실패');
          } else if (res.data.msg == 'success') {
            alert('삭제성공');
            this.$router.go(this.$router.current);
          }
        })
        .catch(() => {
          alert('삭제실패');
        })
        .finally(() => (this.loading = false));
      this.$refs['my-modal'].toggle('#toggle-btn');
    },
    toggleModal() {
      axios
        .get(`${SERVER_URL}/interest/regist/${this.apt.apt.no}/${this.userid}`)
        .then((res) => {
          if (res.data.msg == 'fail') {
            alert('등록실패');
          } else if (res.data.msg == 'success') {
            alert('등록성공');
          }
        })
        .catch(() => {
          alert('등록실패');
        })
        .finally(() => (this.loading = false));
      this.$refs['my-modal'].toggle('#toggle-btn');
    },
  },
  computed: {
    ...mapGetters(['getAccessToken', 'getUserId', 'getUserName']),
    pageCount() {
      let listLeng = this.aptlist.length,
        listSize = this.pageSize,
        page = Math.floor((listLeng - 1) / listSize) + 1;
      return page;
    },
    paginatedData() {
      const start = this.pageNum * this.pageSize,
        end = start + this.pageSize;
      return this.aptlist.slice(start, end);
    },
  },
  filters: {
    price(value) {
      if (!value) return value;
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
