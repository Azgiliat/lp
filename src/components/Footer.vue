<template functional>
  <div class="footer" :key="'footer'">
    <p class="footer__text">
      Футер сайта
    </p>
  </div>
</template>

<script>
  export default {
    name: "Footer"
  }
</script>

<style lang="scss" scoped>
.footer {
  &__text {
    font-size: 50px;
    line-height: 50px;
    text-align: center;
    margin: 0;
  }
}
</style>
