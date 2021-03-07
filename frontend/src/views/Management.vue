<template>
  <div id="Management">
    <div id="wrapper-bgbtm" style="width: 700px; margin: 0 auto">
      <form role="form" method="post" action="${root}/member/modifyMember">
        <div class="form-group" id="divId">
          <label for="inputId" class="col-lg-2 control-label">아이디</label>
          <div class="col-lg-10">
            <input
              type="text"
              class="form-control onlyAlphabetAndNumber"
              id="id"
              data-rule-required="true"
              placeholder=""
              maxlength="30"
              value="${userinfo.id}"
              readonly="readonly"
              name="id"
              v-model="user.id"
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
              id="password"
              name="pw"
              data-rule-required="true"
              placeholder="패스워드"
              v-model="user.pw"
              maxlength="30"
              required="required"
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
              id="passwordCheck"
              data-rule-required="true"
              placeholder="패스워드 확인"
              maxlength="30"
              required="required"
              v-model="user.pwChk"
            />
          </div>
        </div>
        <div class="form-group" id="divName">
          <label for="inputName" class="col-lg-2 control-label">이름</label>
          <div class="col-lg-10">
            <input
              type="text"
              class="form-control onlyHangul"
              id="name"
              data-rule-required="true"
              placeholder="한글만 입력 가능합니다."
              maxlength="15"
              value=""
              required="required"
              name="name"
              v-model="user.name"
            />
          </div>
        </div>

        <div class="form-group" id="divNickname">
          <label for="inputNickname" class="col-lg-2 control-label">별명</label>
          <div class="col-lg-10">
            <input
              type="text"
              name="nickName"
              class="form-control"
              id="nickname"
              data-rule-required="true"
              placeholder="별명"
              maxlength="15"
              value=""
              required="required"
              v-model="user.nickname"
            />
          </div>
        </div>

        <div class="form-group" id="divEmail">
          <label for="inputEmail" class="col-lg-2 control-label">이메일</label>
          <div class="col-lg-10">
            <input
              type="email"
              class="form-control"
              id="email"
              data-rule-required="true"
              placeholder="이메일"
              maxlength="40"
              value=""
              required="required"
              name="email"
              v-model="user.email"
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
              id="phoneNumber"
              data-rule-required="true"
              name="phoneNumber"
              placeholder="-를 제외하고 숫자만 입력하세요."
              maxlength="11"
              value=""
              required="required"
              v-model="user.phoneNumber"
            />
          </div>
        </div>
        <div class="form-group">
          <label for="inputPhoneNumber" class="col-lg-2 control-label"
            >성별</label
          >
          <div class="col-lg-10">
            <select
              class="form-control"
              id="gender"
              name="gender"
              v-model="user.gender"
            >
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
                id="emailReceiveYn"
                name="emailCheck"
                value="Y"
                checked
                v-model="user.emailCheck"
              />
              동의합니다.
            </label>
            <label class="radio-inline">
              <input
                type="radio"
                id="emailReceiveYn"
                name="emailCheck"
                value="N"
                v-model="user.emailCheck"
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
                id="smsReceiveYn"
                v-model="user.phoneCheck"
                value="Y"
                checked
              />
              동의합니다.
            </label>
            <label class="radio-inline">
              <input
                type="radio"
                id="smsReceiveYn"
                v-model="user.phoneCheck"
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
                  v-model="user.memberInfoYn"
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
                  v-model="user.memberInfoYn"
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
              id="modified"
              class="btn btn-primary"
              @click="userModify"
            >
              정보 수정
            </button>
            <button type="button" @click="remove" class="btn btn-primary">
              회원 탈퇴
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
const SERVER_URL = process.env.VUE_APP_SERVER_URL;
export default {
  data() {
    return {
      user: {
        id: localStorage.getItem('id'),
        pw: '',
        pwChk: '',
        name: '',
        nickname: '',
        email: '',
        phoneNumber: '',
        phoneCheck: '',
        gender: '',
        emailCheck: '',
        memberInfoYn: '',
      },
    };
  },
  methods: {
    remove() {
      let isOk = confirm('회원탈퇴하시겠습니까?');

      if (isOk) {
        axios
          .delete(`${SERVER_URL}/member/deleteMember/${this.user.id}`)
          .then((res) => {
            if (res.data.msg == 'fail') {
              alert('삭제실패');
            } else if (res.data.msg == 'success') {
              alert('삭제성공');
            }
          })
          .catch(() => {
            this.errored = true;
            alert('삭제실패');
          })
          .finally(() => {
            this.$store
              .dispatch('LOGOUT')
              .then(() => this.$router.replace(`/`).catch(() => {}));
          });
      }
    },
    userModify() {
      if (
        this.user.pw == '' ||
        this.user.pwChk == '' ||
        this.user.nickname == '' ||
        this.user.email == '' ||
        this.user.phoneNumber == '' ||
        this.user.name == '' ||
        this.user.gender == '' ||
        this.user.emailCheck == '' ||
        this.user.phoneCheck == '' ||
        this.user.memberInfoYn == ''
      ) {
        alert('입력해주세요');
      } else if (this.user.pw == this.user.pwChk) {
        axios
          .put(`${SERVER_URL}/member/modifyMember`, {
            id: this.user.id,
            pw: this.user.pw,
            pwChk: this.user.pwChk,
            name: this.user.name,
            nickName: this.user.nickname,
            email: this.user.email,
            phoneNumber: this.user.phoneNumber,
            gender: this.user.gender,
            emailCheck: this.user.emailCheck,
            phoneCheck: this.user.phoneCheck,
            memberInfoYn: this.user.memberInfoYn,
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
      } else {
        alert('비밀번호를 확인하세요');
      }
    },
  },
};
</script>
<style>
#Management {
  background-color: #ffffff;
  overflow: hidden;
}
</style>
