<template>
  <div id="Modify">
    <b-container align="center">
      <b-col sm="8" align="center">
        <h2>Q&A 글수정</h2>
        <b-form id="writeform" method="post" action="">
          <b-form-group align="left">
            <label for="subject">제목:</label>
            <input
              type="text"
              class="form-control"
              id="subject"
              name="subject"
              v-model="boards.subject"
            />
          </b-form-group>
          <b-form-group align="left">
            <label for="content" style="display: block">내용:</label>
            <b-form-textarea
              rows="15"
              id="content"
              name="content"
              v-model="boards.content"
            ></b-form-textarea>
          </b-form-group>
          <b-button variant="primary" type="button" @click="modify">
            글수정
          </b-button>
          <b-button variant="warning" type="reset">초기화</b-button>
        </b-form>
      </b-col>
    </b-container>
  </div>
</template>
<script>
import axios from 'axios';

const SERVER_URL = process.env.VUE_APP_SERVER_URL;
export default {
  props: ['title', 'no'],
  data() {
    return {
      boards: '',
    };
  },
  mounted() {
    if (this.title == 'guestbook') {
      axios
        .get(`${SERVER_URL}/guestbook/showNotice/${this.no}`)
        .then((response) => {
          this.boards = response.data;
        })
        .catch(() => (this.errored = true))
        .finally(() => (this.loading = false));
    }
    if (this.title == 'notice') {
      axios
        .get(`${SERVER_URL}/board/showNotice/${this.no}`)
        .then((response) => {
          this.boards = response.data;
        })
        .catch(() => (this.errored = true))
        .finally(() => (this.loading = false));
    }
  },
  methods: {
    modify() {
      if (this.boards.subject == '' || this.boards.content == '') {
        alert('글을 작성해 주세요');
        return;
      }

      if (this.title == 'guestbook') {
        axios
          .put(`${SERVER_URL}/guestbook/modify`, {
            articleno: this.boards.articleno,
            subject: this.boards.subject,
            content: this.boards.content,
            userid: this.boards.userid,
            regtime: this.boards.regtime,
          })
          .then(() => {
            alert('글 수정 완료');
            this.$router.push('/');
          });
      }
      if (this.title == 'notice') {
        axios
          .put(`${SERVER_URL}/board/modify`, {
            boardno: this.boards.boardno,
            subject: this.boards.subject,
            content: this.boards.content,
            userid: this.boards.userid,
            regtime: this.boards.regtime,
          })
          .then(() => {
            alert('글 수정 완료');
            this.$router.push('/');
          });
      }
    },
  },
};
</script>

<style>
#Modify {
  background-color: #ffffff;
  height: 700px;
}

#content h2 {
  margin-bottom: 0.2em;
  letter-spacing: -1px;
  font-size: 3em;
  font-weight: 600;
}

#content .byline {
  display: block;
  text-transform: uppercase;
  font-size: 1.1em;
  font-weight: 400;
  margin-bottom: 2em;
}

#content img {
  margin-bottom: 1em;
}

/** WRAPPER */

#wrapper {
  overflow: hidden;
  background-color: #ffffff;
  height: 650px;
}

#wrapper-bgbtm {
  overflow: hidden;
  padding: 5em 0em;
}
</style>
