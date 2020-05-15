<template>
  <div class="loader" :class="isContrast && 'loader--contrast'" />
</template>

<script>
  export default {
    name: "Loader",
    props: {
      isContrast: {
        type: Boolean,
        require: false,
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>
.loader,
.loader:after {
  border-radius: 50%;
  width: 100%;
  height: 100%;
}
.loader {
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba($blue2, 0.2);
  border-right: 1.1em solid rgba($blue2, 0.2);
  border-bottom: 1.1em solid rgba($blue2, 0.2);
  border-left: 1.1em solid $blue2;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;

  &--contrast {
    border-top: 1.1em solid rgba($white, 0.2);
    border-right: 1.1em solid rgba($white, 0.2);
    border-bottom: 1.1em solid rgba($white, 0.2);
    border-left: 1.1em solid $white;
  }
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
