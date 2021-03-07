<template>
  <div id="Login">
    <div class="row" id="Loginrow">
      <div class="col-sm-4" style="margin: auto">
        <div class="card">
          <article class="card-body">
            <h4 class="card-title mb-4 mt-1">Sign in</h4>
            <form action="${root}/member/login" method="post">
              <div class="form-group">
                <label>아이디</label>
                <input
                  id="id"
                  name="id"
                  class="form-control"
                  placeholder="Id"
                  type="text"
                  v-model="user.id"
                />
              </div>
              <!-- form-group// -->
              <div class="form-group">
                <a class="float-right" href="#"></a> <label>비밀번호</label>
                <input
                  class="form-control"
                  placeholder="******"
                  type="password"
                  name="pw"
                  id="pw"
                  v-model="user.pw"
                />
              </div>
              <!-- form-group// -->

              <!-- form-group// -->
              <div class="form-group">
                <button
                  type="button"
                  id="login"
                  class="btn btn-primary btn-block"
                  @click="login"
                >
                  로그인
                </button>
                <button
                  type="button"
                  @click="signup"
                  class="btn btn-primary btn-block"
                >
                  회원가입
                </button>
              </div>
              <!-- form-group// -->
            </form>
          </article>
        </div>
        <!-- card.// -->
      </div>
      <!-- col.// -->
    </div>
    <!-- row.// -->
    <div>
      <div></div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
export default {
  name: 'Login',
  data() {
    return {
      userid: '',
      useremail: '',
      user: {
        id: '',
        pw: '',
      },
    };
  },
  computed: {
    nextRoute() {
      return this.$route.params.nextRoute ? this.$route.params.nextRoute : '';
    },
  },
  methods: {
    toggleModal() {
      //로직 구현하기

      this.$refs['my-modal'].toggle('#toggle-btn');
    },
    hideModal() {
      this.$refs['my-modal'].hide();
    },
    showModal() {
      this.$refs['my-modal'].show();
    },
    login: function() {
      this.$store
        .dispatch('LOGIN', this.user)
        .then(() => this.$router.replace(`/${this.nextRoute}`))
        .catch(({ message }) => (this.msg = message));
    },
    signup() {
      this.$router.push('/signup');
    },
    searchpwd() {},
  },
};
</script>
<style>
#Login {
  background-color: #ffffff;
  height: 600px;
}
#Loginrow {
  padding-top: 100px;
}
</style>
