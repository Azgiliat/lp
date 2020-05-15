<template functional>
  <div class="header" :key="'header'">
    <p class="header__text">
      Шапка сайта
    </p>
  </div>
</template>

<script>
  export default {
    name: "Header"
  }
</script>

<style lang="scss" scoped>
.header {
  border-bottom: 1px solid $blue2;
  margin-bottom: 100px;

  &__text {
    font-size: 50px;
    line-height: 50px;
    text-align: center;
    margin: 0;
  }
}
</style>
