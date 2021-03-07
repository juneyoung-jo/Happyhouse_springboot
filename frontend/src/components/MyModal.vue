<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header" style="display: block">
            <h2>상세보기</h2>
          </div>
          <table class="table table-hover">
            <thead>
              <tr class="table-striped">
                <th colspan="2">작성자</th>
                <th colspan="2">글번호</th>
                <th colspan="2">제목</th>
                <th colspan="2">내용</th>
                <th colspan="2">작성일</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(board, index) in boards" :key="index">
                <td colspan="2">{{ board.userid }}</td>
                <td
                  colspan="2"
                  class="specificno"
                  @click="showModal(board.boardno)"
                >
                  {{ board.boardno }}
                </td>
                <td colspan="2">{{ board.subject }}</td>
                <td colspan="2">
                  {{ board.content }}
                </td>
                <td>{{ board.regtime }}</td>
              </tr>
            </tbody>
          </table>
          <div class="modal-footer">
            <slot name="footer">
              <b-button variant="outline-danger" @click="$emit('close')">
                OK
              </b-button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: ["board"],
  data() {
    return {
      boards: [this.board],
    };
  },
};
</script>
<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 800px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

h2 {
  text-align: center;
}
</style>
