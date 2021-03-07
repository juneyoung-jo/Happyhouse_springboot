<template>
  <div id="notice">
    <b-container align="center">
      <b-col col lg="10" align="center">
        <br />
        <h2>Q&A</h2>

        <table class="table table-borderless">
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

        <form id="searchform" method="get" class="form-inline" action="">
          <input type="hidden" name="pg" id="pg" value="1" />
          <table class="table table-borderless">
            <tr>
              <td align="right">
                <select class="form-control" name="key" id="skey" v-model="key">
                  <option value="userid" selected="selected">아이디</option>
                  <option value="boardno">글번호</option>
                  <option value="subject">제목</option>
                </select>
                <input
                  type="text"
                  class="form-control"
                  placeholder="검색어 입력."
                  name="word"
                  id="sword"
                  v-model="word"
                />
                <b-button variant="info" type="button" @click="searchArticle">
                  검색
                </b-button>
              </td>
            </tr>
          </table>
        </form>

        <table class="table table-hover">
          <thead>
            <tr class="table-striped">
              <th colspan="2">작성자</th>
              <th colspan="2">글번호</th>
              <th colspan="2">제목</th>
              <th colspan="2" align="center">작성일</th>
              <th colspan="2"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(board, index) in paginatedData" :key="index">
              <td colspan="2" align="left" @click="showModal(board.boardno)">
                {{ board.userid }}
              </td>
              <td
                colspan="2"
                align="left"
                class="specificno"
                @click="showModal(board.boardno)"
              >
                {{ board.boardno }}
              </td>
              <td colspan="2" align="left" @click="showModal(board.boardno)">
                {{ board.subject }}
              </td>
              <td colspan="2" align="left" @click="showModal(board.boardno)">
                {{ board.regtime }}
              </td>

              <td>
                <b-button
                  variant="outline-info"
                  type="button"
                  v-if="id == board.userid || id == 'admin'"
                  @click="modify(board.boardno)"
                >
                  수정
                </b-button>
                <b-button
                  variant="outline-danger"
                  type="button"
                  v-if="id == board.userid || id == 'admin'"
                  @click="del(board.boardno)"
                >
                  삭제
                </b-button>
              </td>
            </tr>
          </tbody>
        </table>

        <table class="table table-active" v-if="boards == ''">
          <tbody>
            <tr class="table-info" align="center">
              <td>작성된 글이 없습니다.</td>
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
      </b-col>
    </b-container>
    <!-- The Modal -->
    <MyModal @close="closeModal" v-if="modal" :board="detailBoard"> </MyModal>
  </div>
</template>

<script>
import MyModal from './MyModal.vue';
import axios from 'axios';
const SERVER_URL = process.env.VUE_APP_SERVER_URL;
export default {
  name: 'customers-list',
  data() {
    return {
      id: localStorage.getItem('id'),
      pageNum: 0,
      pageSize: 8,
      boards: [],
      key: 'userid',
      word: '',
      modal: false,
      detailBoard: [],
      title: 'notice',
      not: {
        boardno: '',
        title: 'notice',
      },
      isAdmin: '',
    };
  },
  components: {
    MyModal,
  },

  created() {
    axios
      .get(`${SERVER_URL}/board/main`)
      .then((response) => {
        this.boards = response.data;
      })
      .catch(() => (this.errored = true))
      .finally(() => (this.loading = false));

    if (localStorage.getItem('id') == 'admin') {
      this.isAdmin = true;
    }
  },
  methods: {
    //게시판 작성 페이지로 이동
    movewrite() {
      this.$router.push('/write/' + this.title);
    },
    searchArticle() {
      if (this.word == '') {
        alert('전체 검색');
      }
      this.boards = [];
      axios
        .get(`${SERVER_URL}/board/main/${this.key}/${this.word}`)
        .then((response) => {
          this.boards = response.data;
        })
        .catch(() => (this.errored = true))
        .finally(() => (this.loading = false));
    },
    modify(boardno) {
      this.not.boardno = boardno;
      this.$router.push('/modify/' + this.not.title + '/' + boardno);
    },
    del(boardno) {
      axios.delete(`${SERVER_URL}/board/delete/${boardno}`).then(() => {
        alert('삭제완료');
        this.$router.go(this.$router.currentRoute);
      });
    },
    showModal(boardno) {
      axios
        .get(`${SERVER_URL}/board/showNotice/${boardno}/`)
        .then((response) => {
          this.detailBoard = response.data;
          this.modal = true;
        })
        .catch(() => (this.errored = true))
        .finally(() => (this.loading = false));
    },
    closeModal() {
      this.modal = false;
    },
    nextPage() {
      this.pageNum += 1;
    },
    prevPage() {
      this.pageNum -= 1;
    },
  },
  computed: {
    pageCount() {
      let listLeng = this.boards.length,
        listSize = this.pageSize,
        page = Math.floor((listLeng - 1) / listSize) + 1;
      return page;
    },
    paginatedData() {
      const start = this.pageNum * this.pageSize,
        end = start + this.pageSize;
      return this.boards.slice(start, end);
    },
  },
};
</script>

<style>
/** WRAPPER */

#notice {
  overflow: hidden;
  background-color: #ffffff;
}
</style>
