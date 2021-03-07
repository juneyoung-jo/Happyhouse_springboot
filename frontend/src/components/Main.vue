<template>
  <div id="main">
    <div id="wrapper-bgbtm">
      <div id="featured" class="container">
        <div id="fbox1">
          <b-link to="/priceview"
            ><img src="@/assets/pic01.jpg" alt=""
          /></b-link>
          <h2>실거래가 비교</h2>
          <p>
            원하는 지역 가격 정보를 한 눈에 비교 분석! 업계 최저가로 계약하세요.
          </p>
          <b-link to="/priceview" class="button"><span>More Info</span></b-link>
        </div>
        <div id="fbox2">
          <b-link to="/starview"><img src="@/assets/pic02.jpg" alt=""/></b-link>

          <h2>관심지역 조회</h2>
          <p>
            내가 설정한 관심지역을 조회해 보세요. 지하철역부터 대형마트까지!
            직접 가보지 않아도 쉽게 알아보세요.
          </p>
          <b-link to="/starview" class="button"><span>More Info</span></b-link>
        </div>
        <div id="fbox3">
          <b-link to="/storeview"
            ><img src="@/assets/pic03.jpg" alt=""
          /></b-link>
          <h2>관심지역 업소정보 확인</h2>
          <p>
            주변의 편의시설들을 편하게 검새해 보세요. 지하철역부터 대형마트까지!
            직접 가보지 않아도 쉽게 알아보세요.
          </p>
          <b-link to="/storeview" class="button"><span>More Info</span></b-link>
        </div>
      </div>
      <div id="page" class="container">
        <div id="content">
          <h4>Happy house Vue동산</h4>
          <span class="byline"><strong>집 구경</strong></span>
          <img src="@/assets/pic04.jpg" width="300" height="200" alt="" />
          <p>좋은 집 구경하세요</p>
          <b-link to="/" class="button"><span>More Info</span></b-link>
        </div>
        <div id="sidebar">
          <div>
            <h2>매물 검색 순위</h2>
            <ul v-for="(deal, index) in dealRank" :key="index" class="style1">
              <li>
                <strong
                  ><p class="noticeContent">
                    {{ deal.aptName }}
                  </p></strong
                >
                <span class="writer">매물검색횟수: {{ deal.viewCnt }}</span>
                <br />
                <br />
              </li>
            </ul>
          </div>
        </div>
        <div id="sidebar">
          <div>
            <h2>공지사항</h2>
            <ul
              v-for="(mainnotice, index) in mainNotice"
              :key="index"
              class="style1"
            >
              <li>
                <strong
                  ><p class="noticeContent">
                    {{ mainnotice.subject }}
                  </p></strong
                >
                <span class="writer">작성자: {{ mainnotice.userid }}</span>
                <br />
                <span class="date">작성 날짜: {{ mainnotice.regtime }} + </span>
              </li>
            </ul>

            <b-link to="/guestbook" class="button2">More Info</b-link>
          </div>
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
      key: '',
      word: '',
      mainNotice: [],
      dealRank: [],
    };
  },
  created() {
    axios
      .get(`${SERVER_URL}/guestbook/subMain`)
      .then((response) => {
        this.mainNotice = response.data;
      })
      .catch(() => (this.errored = true))
      .finally(() => (this.loading = false));

    axios
      .get(`${SERVER_URL}/map/dealCount`)
      .then((response) => {
        this.dealRank = response.data;
      })
      .catch(() => (this.errored = true))
      .finally(() => (this.loading = false));
  },
};
</script>
<style>
#main {
  overflow: hidden;
  background-color: #ffffff;
}
#sidebar {
  float: right;
  width: 350px;
}

#sidebar h2 {
  font-size: 2em;
  margin-bottom: 1em;
  font-weight: 600;
}
</style>
