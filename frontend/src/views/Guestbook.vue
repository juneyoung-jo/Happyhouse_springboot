<template>
  <div id="guestbook">
    <div class="container" align="center">
      <div class="col-lg-10" align="center">
        <br />
        <h1>공지사항</h1>
        <table class="table table-borderless" v-if="this.isAdmin == true">
          <tr>
            <td align="right">
              <b-button
                pill
                variant="outline-secondary"
                type="button"
                @click="movewrite"
              >
                글쓰기
              </b-button>
            </td>
          </tr>
        </table>

        <form id="searchform" class="form-inline" action="">
          <table class="table table-borderless">
            <tr>
              <td align="right">
                <select class="form-control" name="key" id="skey" v-model="key">
                  <option value="userid" selected="selected">아이디</option>
                  <option value="articleno">글번호</option>
                  <option value="subject">제목</option>
                </select>
                <input
                  type="text"
                  class="form-control"
                  placeholder="검색어 입력."
                  name="word"
                  id="sword"
                  @keypress.enter.prevent
                  v-model="word"
                />
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="searchArticle"
                >
                  검색
                </button>
              </td>
            </tr>
          </table>
        </form>

        <table class="table table-hover" v-if="guestbooklist != null">
          <thead>
            <tr class="table-striped">
              <th colspan="2">작성자</th>
              <th colspan="2">글번호</th>
              <th colspan="2">제목</th>
              <th colspan="2" align="center">작성일</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(guestbook, index) in paginatedData" :key="index">
              <td colspan="2" align="left">{{ guestbook.userid }}</td>
              <td
                colspan="2"
                align="left"
                @click="specific(guestbook.articleno)"
              >
                {{ guestbook.articleno }}
              </td>
              <td colspan="2" align="left">{{ guestbook.subject }}</td>
              <td align="left">{{ guestbook.regtime }}</td>

              <td v-if="isAdmin == true">
                <b-button
                  variant="outline-info"
                  type="button"
                  @click="guestbookModify(guestbook.articleno)"
                  >수정</b-button
                >
                <b-button
                  variant="outline-danger"
                  type="button"
                  @click="guestbookDelete(guestbook.articleno)"
                  >삭제</b-button
                >
              </td>
            </tr>
          </tbody>
        </table>
        <table class="table table-active" v-else>
          <tbody>
            <tr class="table-info" align="center">
              <td>작성된 글이 없습니다.</td>
            </tr>
          </tbody>
        </table>
      </div>
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
      <span class="page-count">{{ pageNum + 1 }} / {{ pageCount }} 페이지</span>
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
    <MyModal @close="closeModal" v-if="modal" :board="specificNotice">
    </MyModal>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import MyModal from '../components/MyModal.vue';
import axios from 'axios';
const SERVER_URL = process.env.VUE_APP_SERVER_URL;
export default {
  data() {
    return {
      pageNum: 0,
      pageSize: 8,
      //
      isLogin: false,
      guestbooklist: [],
      key: 'userid',
      word: '',
      modal: false,
      specificNotice: [],
      isAdmin: '',
      title: 'guestbook',
      not: {
        title: 'guestbook',
        articleno: '',
      },
    };
  },
  components: {
    MyModal,
  },
  created() {
    if (localStorage.getItem('id') == 'admin') {
      this.isAdmin = true;
    }
    axios
      .get(`${SERVER_URL}/guestbook/all`)
      .then((response) => {
        this.guestbooklist = response.data;
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
    //
    guestbookDelete(articleno) {
      axios
        .delete(`${SERVER_URL}/guestbook/delete/${articleno}`)
        .then((res) => {
          if (res.data.msg == 'fail') {
            alert('삭제실패');
          } else if (res.data.msg == 'success') {
            alert('삭제성공');
            this.$router.go(this.$router.current);
          }
        })
        .catch(() => {
          this.errored = true;
          alert('삭제실패');
        })
        .finally(() => (this.loading = false));
    },
    movewrite() {
      this.$router.push('/write/' + this.title);
    },
    guestbookModify(articleno) {
      this.not.articleno = articleno;
      this.$router.push('/modify/' + this.not.title + '/' + articleno);
    },
    searchArticle() {
      if (this.word == '') {
        axios
          .get(`${SERVER_URL}/guestbook/all`)
          .then((response) => {
            this.guestbooklist = response.data;
          })
          .catch(() => (this.errored = true))
          .finally(() => (this.loading = false));
        alert('전체 검색');
      } else {
        axios
          .get(`${SERVER_URL}/guestbook/main/${this.key}/${this.word}`)
          .then((response) => {
            this.guestbooklist = response.data;
          })
          .catch(() => (this.errored = true))
          .finally(() => (this.loading = false));
      }
    },
    specific(articleno) {
      axios
        .get(`${SERVER_URL}/guestbook/showNotice/${articleno}`)
        .then((response) => {
          this.specificNotice = response.data;
          this.modal = true;
        })
        .catch(() => (this.errored = true))
        .finally(() => (this.loading = false));
    },
    closeModal() {
      this.modal = false;
    },
  },
  computed: {
    ...mapGetters(['getAccessToken', 'getUserId', 'getUserName']),
    pageCount() {
      let listLeng = this.guestbooklist.length,
        listSize = this.pageSize,
        page = Math.floor((listLeng - 1) / listSize) + 1;
      return page;
    },
    paginatedData() {
      const start = this.pageNum * this.pageSize,
        end = start + this.pageSize;
      return this.guestbooklist.slice(start, end);
    },
  },
};
</script>
<style>
/** WRAPPER */

#guestbook {
  overflow: hidden;
  background-color: #ffffff;
}
.btn-cover {
  margin-bottom: 1.5rem;
  text-align: center;
}
.btn-cover .page-btn {
  width: 5rem;
  letter-spacing: 0.5px;
}
.btn-cover .page-count {
  padding: 0 1rem;
}
</style>
