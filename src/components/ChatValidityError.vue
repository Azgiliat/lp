<template>
  <div class="chat-error">
    <p class="chat-error__text">
      {{errorText}}
    </p>
  </div>
</template>

<script>
  export default {
    name: "ChatValidityError",
    props: {
      errorText: {
        type: String,
        require: true
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
