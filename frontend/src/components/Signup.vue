<template>
  <div id="signup">
    <div id="signup-bgbtm" style="width: 700px; margin: 0 auto;">
      <div class="form-group" id="divId">
        <label for="inputId" class="col-lg-2 control-label">아이디</label>
        <div class="col-lg-10">
          <input
            type="text"
            class="form-control onlyAlphabetAndNumber"
            v-model="id"
            data-rule-required="true"
            name="id"
            placeholder="아이디"
            maxlength="30"
          />
        </div>
      </div>
      <div class="form-group" id="divPassword">
        <label for="inputPassword" class="col-lg-2 control-label"
          >패스워드</label
        >
        <div class="col-lg-10">
          <input
            type="password"
            class="form-control"
            v-model="pw"
            name="pw"
            data-rule-required="true"
            placeholder="패스워드"
            maxlength="30"
          />
        </div>
      </div>
      <div class="form-group" id="divPasswordCheck">
        <label for="inputPasswordCheck" class="col-lg-2 control-label"
          >패스워드 확인</label
        >
        <div class="col-lg-10">
          <input
            type="password"
            class="form-control"
            v-model="pwChk"
            data-rule-required="true"
            placeholder="패스워드 확인"
            maxlength="30"
          />
        </div>
      </div>
      <div class="form-group" id="divName">
        <label for="inputName" class="col-lg-2 control-label">이름</label>
        <div class="col-lg-10">
          <input
            type="text"
            class="form-control onlyHangul"
            v-model="name"
            data-rule-required="true"
            name="name"
            placeholder="한글만 입력 가능합니다."
            maxlength="15"
          />
        </div>
      </div>

      <div class="form-group" id="divNickname">
        <label for="inputNickname" class="col-lg-2 control-label">별명</label>
        <div class="col-lg-10">
          <input
            type="text"
            class="form-control"
            v-model="nickname"
            data-rule-required="true"
            placeholder="별명"
            name="nickName"
            maxlength="15"
          />
        </div>
      </div>

      <div class="form-group" id="divEmail">
        <label for="inputEmail" class="col-lg-2 control-label">이메일</label>
        <div class="col-lg-10">
          <input
            type="email"
            class="form-control"
            v-model="email"
            data-rule-required="true"
            placeholder="이메일"
            name="email"
            maxlength="40"
          />
        </div>
      </div>
      <div class="form-group" id="divPhoneNumber">
        <label for="inputPhoneNumber" class="col-lg-2 control-label"
          >휴대폰 번호</label
        >
        <div class="col-lg-10">
          <input
            type="tel"
            class="form-control onlyNumber"
            v-model="phoneNumber"
            data-rule-required="true"
            name="phoneNumber"
            placeholder="-를 제외하고 숫자만 입력하세요."
            maxlength="11"
          />
        </div>
      </div>
      <div class="form-group">
        <label for="inputPhoneNumber" class="col-lg-2 control-label"
          >성별</label
        >
        <div class="col-lg-10">
          <select class="form-control" v-model="gender" name="gender">
            <option value="M">남</option>
            <option value="F">여</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label for="inputEmailReceiveYn" class="col-lg-2 control-label"
          >이메일 수신여부</label
        >
        <div class="col-lg-10">
          <label class="radio-inline">
            <input
              type="radio"
              v-model="emailCheck"
              name="emailCheck"
              value="Y"
              checked
            />
            동의합니다.
          </label>
          <label class="radio-inline">
            <input
              type="radio"
              v-model="emailCheck"
              name="emailCheck"
              value="N"
            />
            동의하지 않습니다.
          </label>
        </div>
      </div>
      <div class="form-group">
        <label for="inputPhoneNumber" class="col-lg-2 control-label"
          >SMS 수신여부</label
        >
        <div class="col-lg-10">
          <label class="radio-inline">
            <input
              type="radio"
              v-model="phoneCheck"
              name="phoneCheck"
              value="Y"
              checked
            />
            동의합니다.
          </label>
          <label class="radio-inline">
            <input
              type="radio"
              v-model="phoneCheck"
              name="phoneCheck"
              value="N"
            />
            동의하지 않습니다.
          </label>
        </div>
      </div>
      <div class="form-group">
        <label for="memberInfo" class="col-lg-2 control-label"
          >개인정보취급방침</label
        >
        <div class="col-lg-10" id="memberInfo">
          <div class="radio">
            <label>
              <input
                type="radio"
                v-model="memberInfoYn"
                name="memberInfoYn"
                value="Y"
                checked
              />
              동의합니다.
            </label>
          </div>
          <div class="radio">
            <label>
              <input
                type="radio"
                v-model="memberInfoYn"
                name="memberInfoYn"
                value="N"
              />
              동의하지 않습니다.
            </label>
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="col-lg-offset-2 col-lg-10">
          <button
            type="button"
            @click="signin()"
            id="signin"
            class="btn btn-primary"
          >
            Sign in
          </button>
        </div>
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
      id: '',
      pw: '',
      pwChk: '',
      name: '',
      nickname: '',
      email: '',
      phoneNumber: '',
      gender: '',
      emailCheck: '',
      phoneCheck: '',
      memberInfoYn: '',
    };
  },
  methods: {
    signin() {
      if (
        this.id == '' ||
        this.pw == '' ||
        this.pwChk == '' ||
        this.name == '' ||
        this.nickname == '' ||
        this.email == '' ||
        this.phoneNumber == '' ||
        this.gender == '' ||
        this.emailCheck == '' ||
        this.phoneCheck == '' ||
        this.memberInfoYn == ''
      ) {
        alert('입력해주세요');
      } else if (this.pw != this.pwChk || this.pw == '' || this.pwChk == '') {
        alert('비밀번호를 확인해주세요');
      } else {
        axios
          .post(`${SERVER_URL}/member/signup`, {
            id: this.id,
            pw: this.pw,
            pwChk: this.pwChk,
            name: this.name,
            nickName: this.nickname,
            email: this.email,
            phoneNumber: this.phoneNumber,
            gender: this.gender,
            emailCheck: this.emailCheck,
            phoneCheck: this.phoneCheck,
            memberInfoYn: this.memberInfoYn,
          })
          .then((res) => {
            if (res.data.msg == 'fail') {
              alert('등록실패');
              this.$router.go(this.$router.current);
            } else if (res.data.msg == 'success') {
              alert('등록성공');
              this.$router.push('/');
            }
          })
          .catch(() => {
            this.errored = true;
            alert('등록실패');
            this.$router.go(this.$router.current);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
  },
};
</script>
<style>
#signup {
  overflow: hidden;
  background-color: #ffffff;
  /* height: 650px; */
}

#signup-bgbtm {
  overflow: hidden;
  padding: 5em 0em;
}
</style>
