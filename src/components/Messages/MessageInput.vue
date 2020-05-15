<template>
  <div class="message-input" :class="isDisabled && 'message-input--disabled'">
    <div class="message-input__text-block">
      <label class="message-input__label" :class="(text.length || isFocused) && 'message-input__label--got-text'">
        <span class="message-input__placeholder">
          {{placeholderText}}
        </span>
        <textarea @focus="onFocusHandler" @blur="onBlurHandler"
                  placeholder="Введите текст..." class="message-input__text" v-model="text"/>
      </label>
    </div>
    <button type="button" class="message-input__send-button send-button" @click="sendMessage"
            @keyap.enter="sendMessage">
      <transition name="sending" mode="out-in" :duration="0">
        <svg v-if="!sendingStatus" class="send-button__icon" width="22" height="18">
          <use xlink:href="#send"/>
        </svg>
        <Loader v-else class="send-button__loader" :isContrast="true"/>
      </transition>
    </button>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';
  import Loader from "@/components/Loader.vue";

  export default {
    name: "MessageInput",
    components: {
      Loader
    },
    props: {
      sendingStatus: {
        type: Boolean,
        require: true
      },
      loadingStatus: {
        type: Boolean,
        require: true
      },
      currentDialogId: {
        type: [Number, String],
        require: true
      },
      gotError: {
        type: Boolean,
        require: true
      }
    },
    data() {
      return {
        text: '',
        isFocused: false
      }
    },
    computed: {
      isDisabled() {
        return this.loadingStatus || this.sendingStatus || !this.currentDialogId || this.gotError
      },
      placeholderText() {
        if (!this.currentDialogId) {
          return 'Выберите диалог, чтобы отправить сообщение.'
        }
        if (this.loadingStatus) {
          return 'Загружаем переписку, пожалуйста, подождите.'
        }
        if (this.gotError) {
          return ''
        }
        return 'Введите текст...'
      }
    },
    methods: {
      ...mapActions('chats', {
        pushMessage: 'sendMessage'
      }),
      onFocusHandler() {
        this.isFocused = true;
      },
      onBlurHandler() {
        this.isFocused = false;
      },
      sendMessage() {
        if (this.text.length) {
          this.pushMessage(this.text);
          this.text = '';
        }
      }
    },
    watch: {
      currentDialogId(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.text = '';
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.message-input {
  border-top: 1px solid $grey2;
  height: 10%;
  display: flex;

  &__text-block {
    flex-grow: 1;
    padding: 10px 33px;
  }

  &__label {
    display: block;
    width: 100%;
    height: 100%;
    position: relative;

    .message-input__placeholder {
      position: absolute;
      display: block;
      color: $grey10;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      opacity: 1;
      transition: opacity $transition;
    }

    &--got-text .message-input__placeholder {
      opacity: 0;
    }
  }

  &__text {
    width: 100%;
    height: 100%;
    resize: none;
    border: none;
    outline: none;
    display: block;

    &::placeholder {
      opacity: 0;
      // можно было бы вертикально выронять плейсхолдер с помощью line-height, но это только для фиксированной выосты сработает
    }
  }

  &--disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}

.send-button {
  height: 100%;
  width: 13%;
  background-color: $blue2;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;

  &__icon {
    fill: $white;
  }

  &__loader {
    width: 40px;
    height: 40px;
  }
}
</style>
