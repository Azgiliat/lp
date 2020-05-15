<template>
  <div class="error">
    <p class="error__text">
      {{errorText}}
    </p>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: "Error",
    computed: {
      ...mapGetters('chats', {
        errorText: 'getError'
      })
    }
  }
</script>

<style lang="scss" scoped>
.error {
  &__text {
    margin: 0;
    color: red;
    text-align: center;
  }
}
</style>
