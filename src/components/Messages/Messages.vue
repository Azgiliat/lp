<template>
  <div class="messages">
    <transition name="loading-messages" mode="out-in">
      <component :is="currentComponent" :messages="currentComponent === 'Correspondence' && messages"
                 :class="`messages__${currentComponent}`"/>
    </transition>
    <MessageInput class="messages__message-input" :currentDialogId="currentDialogId" :sendingStatus="sendingStatus"
                  :loadingStatus="loadingStatus" :gotError="currentComponent === 'Error'"/>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import MessageInput from "./MessageInput.vue";
  import Correspondence from "./Correspondence.vue";
  import Loader from "@/components/Loader.vue";
  import Error from "@/components/Error.vue";

  export default {
    name: "Messages",
    props: {
      currentDialogId: {
        type: [Number, String],
        require: false
      }
    },
    components: {
      Correspondence,
      MessageInput,
      Loader,
      Error
    },
    computed: {
      ...mapGetters('chats', {
        getMessages: 'getMessages',
        loadingStatus: 'getLoadingStatus',
        error: 'getError',
        sendingStatus: 'getMessageSendingStatus'
      }),
      messages() {
        return this.currentDialogId ? this.getMessages(this.currentDialogId).parts : [];
      },
      currentComponent() {
        if (this.loadingStatus) {
          return 'Loader'
        }
        if (this.error.length) {
          return 'Error'
        }
        return 'Correspondence'
      }
    }
  }
</script>

<style lang="scss" scoped>
.messages {
  background: #FFFFFF;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  min-height: 720px;

  &__Loader {
    margin: auto;
    width: 60px;
    height: 60px;
  }

  &__Error {
    margin-top: auto;
    margin-bottom: 40px;
  }
}

.loading-messages-enter-active, .loading-messages-leave-active {
  transition: opacity $transition;
}

.loading-messages-enter, .loading-messages-leave-to {
  opacity: 0;
}

.loading-messages-enter-to {
  opacity: 1;
}
</style>
