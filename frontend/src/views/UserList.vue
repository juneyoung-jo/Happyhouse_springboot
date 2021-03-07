<template>
  <div id="wrapper">
    <div class="searchcontainer" align="center">
      <br />
      <h2>회원정보</h2>
      <form id="searchform" method="post" class="form-inline">
        <table class="table table-borderless">
          <tr>
            <td align="right">
              <select class="form-control" name="key" v-model="key">
                <option value="id" selected="selected">아이디</option>
                <option value="name">이름</option>
                <option value="nickName">닉네임</option>
              </select>
              <input
                type="text"
                class="form-control"
                placeholder="검색어 입력."
                name="word"
                v-model="word"
                @keypress.enter.prevent
              />
              <button type="button" @click="search" class="btn btn-primary">
                검색
              </button>
            </td>
          </tr>
        </table>
      </form>

      <table class="table table-hover" v-if="userlist != null">
        <thead class="black white-text">
          <tr>
            <th scope="col">아이디</th>
            <th scope="col">이름</th>
            <th scope="col">닉네임</th>
            <th scope="col">이메일</th>
          </tr>
        </thead>
        <thead class="black white-text">
          <tr class="table" v-for="(user, index) in paginatedData" :key="index">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.nickName }}</td>
            <td>{{ user.email }}</td>
          </tr>
        </thead>
      </table>

      <table class="table table-active" v-else>
        <tbody>
          <tr class="table-info" align="center">
            <td>등록된 회원이 없습니다.</td>
          </tr>
        </tbody>
      </table>
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
  </div>
</template>
<script>
import axios from 'axios';
const SERVER_URL = process.env.VUE_APP_SERVER_URL;
export default {
  data() {
    return {
      pageNum: 0,
      pageSize: 7,
      userlist: [],
      key: 'id',
      word: '',
    };
  },
  created() {
    axios
      .get(`${SERVER_URL}/member/listAll`)
      .then((response) => {
        this.userlist = response.data;
      })
      .catch(() => (this.errored = true))
      .finally(() => (this.loading = false));
  },
  methods: {
    nextPage() {
      this.pageNum += 1;
    },
    prevPage() {
      this.pageNum -= 1;
    },
    search() {
      axios
        .get(`${SERVER_URL}/member/searchMember/${this.key}/${this.word}`)
        .then((response) => {
          this.userlist = response.data;
        })
        .catch(() => (this.errored = true))
        .finally(() => (this.loading = false));
    },
  },
  computed: {
    pageCount() {
      let listLeng = this.userlist.length,
        listSize = this.pageSize,
        page = Math.floor((listLeng - 1) / listSize) + 1;
      return page;
    },
    paginatedData() {
      const start = this.pageNum * this.pageSize,
        end = start + this.pageSize;
      return this.userlist.slice(start, end);
    },
  },
};
</script>
