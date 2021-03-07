<template>
  <div id="wrapper" style="height: 700px">
    <div class="container" align="center">
      <div class="col-lg-6" align="center">
        <br />
        <h2>{{ this.isTitle }} 글쓰기</h2>
        <form id="writeform" method="post" action="">
          <div class="form-group" align="left">
            <label for="subject">제목:</label>
            <input
              type="text"
              class="form-control"
              id="subject"
              name="subject"
              v-model="subject"
            />
          </div>
          <div class="form-group" align="left">
            <label for="content">내용:</label>
            <textarea
              class="form-control"
              rows="15"
              id="content"
              name="content"
              v-model="content"
            ></textarea>
          </div>
          <button type="button" class="btn btn-primary" @click="writeArticle">
            글작성
          </button>
          <button type="reset" class="btn btn-warning">초기화</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
const SERVER_URL = process.env.VUE_APP_SERVER_URL;
export default {
  props: ['title'],
  data() {
    return {
      isTitle: '',
      subject: ' ',
      content: ' ',
      userid: '',
    };
  },
  methods: {
    writeArticle() {
      if (this.subject == ' ' || this.content == ' ') {
        alert('글을 작성해주세요!');
        return;
      }

      if (this.title == 'notice') {
        axios
          .post(`${SERVER_URL}/board/noticeWrite`, {
            userid: localStorage.getItem('id'),
            subject: this.subject,
            content: this.content,
          })
          .then(() => {
            alert('Q&A 글 작성 완료');
            this.$router.push('/notice');
          });
      }
      if (this.title == 'guestbook') {
        axios
          .post(`${SERVER_URL}/guestbook/noticeWrite`, {
            subject: this.subject,
            content: this.content,
          })
          .then(() => {
            alert('공지사항 작성 완료');
            this.$router.push('/guestbook');
          });
      }
    },
  },
  computed: {
    ...mapGetters(['getAccessToken', 'getUserId', 'getUserName']),
  },
  mounted() {
    if (this.title == 'guestbook') {
      this.isTitle = '공지사항';
    } else {
      this.isTitle = 'Q&A';
    }
  },
};
</script>
