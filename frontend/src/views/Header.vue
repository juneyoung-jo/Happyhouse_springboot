<template>
  <b-container id="header">
    <div id="logo">
      <h1>
        <b-link to="/">Happy<span>House</span></b-link>
      </h1>
    </div>
    <div id="menu">
      <!-- 로그인 되었을시 -->
      <ul v-if="this.isLogin == true">
        <li class="active">
          <b-link to="/">소개</b-link>
        </li>
        <li><b-link to="/notice">Q&A</b-link></li>
        <li><b-link to="/sitemap">사이트맵</b-link></li>

        <li>
          <b-link to="/userlist">회원정보 검색</b-link>
        </li>

        <li>
          <b-link to="/management">회원정보 수정</b-link>
        </li>
        <li>
          <b-button @click.prevent="onClickLogout">로그아웃</b-button>
        </li>
      </ul>
      <ul v-else-if="getAccessToken">
        <li class="active">
          <b-link to="/">소개</b-link>
        </li>
        <li><b-link to="/notice">Q&A</b-link></li>
        <li><b-link to="/sitemap">사이트맵</b-link></li>

        <li>
          <b-link to="/userlist">회원정보 검색</b-link>
        </li>

        <li>
          <b-link to="/management">회원정보 수정</b-link>
        </li>
        <li>
          <b-button @click.prevent="onClickLogout">로그아웃</b-button>
        </li>
      </ul>
      <!-- 로그인 안되어있을 경우 -->
      <ul v-else>
        <li class="active">
          <b-link to="/">소개</b-link>
        </li>
        <li><b-link to="/notice">Q&A</b-link></li>
        <li><b-link to="/sitemap">사이트맵</b-link></li>
        <li><b-link to="/login">로그인</b-link></li>
      </ul>
    </div>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      isLogin: false,
    };
  },
  created() {
    if (localStorage.getItem('key') != null) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  },
  computed: {
    ...mapGetters(['getAccessToken', 'getUserId', 'getUserName']),
    nextRoute() {
      return this.$route.params.nextRoute ? this.$route.params.nextRoute : '';
    },
  },

  methods: {
    onClickLogout() {
      this.isLogin = false;
      this.$store
        .dispatch('LOGOUT')
        .then(() => this.$router.replace(`/${this.nextRoute}`).catch(() => {}));
    },
  },
};
</script>
<style>
#header {
  overflow: hidden;
  height: 150px;
}

/** MENU */

#menu {
  padding: 60px 0px 0px 0px;
}

#menu ul {
  float: right;
  margin: 0px;
  padding: 0px;
  list-style: none;
  line-height: normal;
}

#menu li {
  float: left;
  margin-left: 2em;
}

#menu a {
  display: block;
  padding: 0.5em 1em;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 400;
  font-size: 1em;
  color: #979a97;
}

#menu a:hover {
  text-decoration: underline;
  color: #ffffff;
}

#menu .active a {
  border-radius: 5px;
  background: #fec709;
  color: #000000;
}

#menu .first {
  padding-left: 0px;
  border-left: none;
  box-shadow: none;
}

/** LOGO */

#logo {
  position: relative;
  float: left;
  width: 380px;
  height: 100px;
}

#logo h1,
#logo p {
  margin: 0px;
  line-height: normal;
}

#logo h1 a {
  display: block;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  line-height: 150px;
  color: #ffffff;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 400;
  font-size: 1.5em;
}

#logo span {
  color: #fec709;
}
</style>
