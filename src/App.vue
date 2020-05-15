<template>
  <div class="app">
    <router-view class="app__content"/>
  </div>
</template>
<script>
  export default {
    name: 'App'
  }
</script>

<style lang="scss">
*,
*::after,
*::before {
  box-sizing: inherit;
}

html {
  box-sizing: border-box;
}

body {
  font-family: $main-font;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &__content {
    margin-bottom: 120px;

    @media(min-width: $desktop-width) {
      margin-bottom: 150px;
    }
  }

  &__header {
    margin-bottom: 100px;
  }
}
</style>
