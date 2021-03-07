<template>
  <div>
    <b-modal id="modal-lg" size="lg" ref="my-modal" hide-footer title="로드뷰">
      <template>
        <div id="map" class="map" ref="map"></div>
      </template>
      <b-button class="mt-3" variant="outline-danger" block @click="hideModal"
        >Close</b-button
      >
    </b-modal>
  </div>
</template>

<script>
const KAKAO_API_KEY = process.env.VUE_APP_KAKAO_API_KEY;
export default {
  props: ['road'],
  watch: {
    road: {
      deep: true,
      handler() {
        this.kakao && this.kakao.maps
          ? this.initMap()
          : this.addKakaoMapScript();
        this.$refs['my-modal'].show();
      },
    },
  },
  mounted() {},
  methods: {
    hideModal() {
      this.$refs['my-modal'].hide();
    },
    addKakaoMapScript() {
      const script = document.createElement('script');
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${KAKAO_API_KEY}`;
      document.head.appendChild(script);
    },
    initMap() {
      // var roadviewContainer = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
      var roadviewContainer = this.$refs['map'];
      var roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
      var roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체

      //지도를 생성할 때 필요한 기본 옵션
      var position = new kakao.maps.LatLng(this.road.lat, this.road.lng); //지도의 중심좌표.

      roadviewClient.getNearestPanoId(position, 50, function(panoId) {
        roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
      }); //지도 생성 및 객체 리턴
    },
  },
};
</script>

<style>
.map {
  width: 100%;
  height: 500px;
}
#loadview {
  height: 600px;
  background-color: #ffffff;
}
</style>
