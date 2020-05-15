<template>
  <div class="message" :class="[isIncome && 'message--income', message.sendingError && 'message--error']">
    <div class="message__error-sign" v-show="message.sendingError">
      <svg width="20" height="20" class="message__error-icon">
        <use xlink:href="#error" />
      </svg>
      <svg width="18" height="18" class="message__resend-icon" @click="resendMessage(message.id)">
        <use xlink:href="#resend" />
      </svg>
    </div>
    <p class="message__text">
      {{message.text}}
    </p>
    <p class="message__info">
      <span class="message__name">{{message.author}}</span>
      <span class="message__date">{{message.created | dateToNormal}}</span>
    </p>
    <transition name="error" v-on:after-enter="afterEnter">
      <p v-show="message.sendingError" class="message__error">
        Сообщение не отправлено.
      </p>
    </transition>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  export default {
    name: "Message",
    props: {
      message: {
        type: Object,
        require: true
      }
    },
    methods: {
      ...mapActions('chats', {
        resendMessage: 'resendMessage'
      }),
      afterEnter(el) {
        this.$emit('errorIn', el.clientHeight)
      }
    },
    computed: {
      ...mapGetters('chats', {
        username: 'getUsername'
      }),
      isIncome() {
        return this.username !== this.message.author;
      }
    },
    filters: {
      dateToNormal (str) {
        return str.replace(/-/g, '.')
      }
    }
  }
</script>

<style lang="scss" scoped>
.message {
  max-width: 55%;
  width: fit-content;
  margin-left: auto;
  padding-left: 25px;
  position: relative;
  transition: width $transition;

  &__info {
    vertical-align: bottom;
    width: fit-content;
    margin: 10px 0 0 auto;
  }

  &__name {
    font-size: 13px;
    line-height: 141.62%;
    color: $black;
    margin-right: 12px;
    font-weight: bolder;
  }

  &__date {
    color: $grey4;
    font-size: 10px;
    line-height: 141.62%;
  }

  &__text {
    margin: 0;
    color: $outcomeText;
    font-size: 14px;
    line-height: 141.62%;
    padding: 18px 17px 16px 26px;
    background-color: $outcome;

    border-radius: 8px 8px 8px 0;
    text-align: right;
  }

  &__error {
    margin: 0;
    font-size: 12px;
    line-height: 141.62%;
    transition: opacity $transition;
    color: $error;
  }

  &--error {
    .message__error-sign {
      position: absolute;
      top: 5px;
      left: 0;
    }

    .message__error-icon, .message__resend-icon {
      display: block;
    }
    .message__resend-icon {
      margin: 5px auto 0;
      fill: $grey4;

      &:hover {
        cursor: pointer;
      }
    }

  }

  &--income {
    margin-right: auto;
    margin-left: 0;
    padding-left: 0;

    .message__text {
      color: $incomeText;
      padding: 21px 21px 16px 21px;
      background-color: $income;
      text-align: left;
    }

    .message__info {
      margin: 10px auto 0 0;
    }

    .message__error-sign {
      display: none;
    }
  }

  .error-enter {
    opacity: 0;
  }

  .error-enter-to {
    opacity: 1;
  }
}
</style>
