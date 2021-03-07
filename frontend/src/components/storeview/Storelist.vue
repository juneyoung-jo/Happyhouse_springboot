<template>
  <div class="col-sm-5 no-padding" id="pricelist">
    <template v-if="aptCodes == ''">
      <div class="price-row"></div>
      <div class="price-row"></div>
      <div class="price-row"></div>
      <div class="price-row"></div>
      <div class="price-row"></div>
      <div class="price-row"></div>
    </template>
    <table class="table table-hover">
      <tbody>
        <tr
          v-for="(apt, index) in aptCodes"
          :key="index"
          @click="moreinfo(apt)"
        >
          <td id="pricetd">
            &nbsp;&nbsp;
            <h3>{{ apt.storename }}</h3>
            <p>업종 : {{ apt.kind }}</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: ['aptCodes'],
  data() {
    return {
      count: 0,

      getApt: {
        cnt: 1,
        apt: '',
      },
      myStyle: {
        backgroundColor: '',
        color: '',
      },
    };
  },
  methods: {
    moreinfo(apt) {
      if (this.getApt.cnt == 1) {
        this.getApt.cnt = 0;
      } else {
        this.getApt.cnt = 1;
      }
      this.getApt.apt = apt;
      this.$emit('getApt', this.getApt);
    },
  },
};
</script>
<style>
#pricetd {
  border: 1px solid black;
}
.price-row {
  height: 97.4px;
  border: 1px solid black;
  background-color: #ffffff;
  padding-left: 40px;
}
#pricelist {
  height: 600px;
  background-color: white;
  overflow: auto;
  padding-right: 0px;
}
#pricelist::-webkit-scrollbar {
  width: 10px;
}
#pricelist::-webkit-scrollbar-thumb {
  background-color: #2f3542;
}
#pricelist::-webkit-scrollbar-track {
  background-color: grey;
}

#pricetable {
  border-top: 1px solid #dee2e6;
}
</style>
