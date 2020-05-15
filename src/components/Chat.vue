<template>
  <div class="chat-root">
    <transition mode="out-in" name="chat">
      <div class="chat" v-if="!wrongChat.length">
        <Dialogs @chooseDialog="chooseDialog" class="chat__dialogs" :dialogs="dialogs"
                 :currentDialogId="currentDialogId"/>
        <Messages class="chat__messages" :currentDialogId="currentDialogId"/>
      </div>
      <ChatValidityError :errorText="wrongChat" v-else />
    </transition>
  </div>
</template>

<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex';
  import Dialogs from "./Dialogs/Dialogs.vue";
  import Messages from "./Messages/Messages.vue";
  import ChatValidityError from "./ChatValidityError.vue";

  export default {
    name: "Chat",
    components: {
      Dialogs,
      Messages,
      ChatValidityError
    },
    data() {
      return {
        currentDialogId: null,
        wrongChat: ''
      }
    },
    created() {
      if (this.$route.params.id) {
        this.currentDialogId = parseInt(this.$route.params.id);

        if (typeof this.singleDialog(this.currentDialogId) !== 'undefined') {
          this.setCurrentDialogId(this.currentDialogId); // возможно другим частям приложения будет нужно знать, какой диалог сейчас активен
          this.loadMessages();
        } else {
          this.wrongChat = 'Такого чатат не существует'
        }
      }
    },
    methods: {
      ...mapActions('chats', {
        loadMessages: 'loadMessages'
      }),
      ...mapMutations('chats', {
        setCurrentDialogId: 'setCurrentDialogId'
      }),
      chooseDialog(evt) {
        this.currentDialogId = evt;
        if (typeof this.singleDialog(this.currentDialogId) !== 'undefined') {
          this.setCurrentDialogId(this.currentDialogId);
          this.loadMessages();
        } else {
          this.wrongChat = 'Такого чатат не существует'
        }
      }
    },
    computed: {
      ...mapGetters('chats', {
        allDialogs: 'getAllDialogs',
        singleDialog: 'getSingleDialog'
      }),
      dialogs() {
        return this.$route.params.id ? [this.singleDialog(parseInt(this.$route.params.id))] : this.allDialogs;
      }
    }
  }
</script>

<style lang="scss" scoped>
.chat {
  width: 980px;
  display: flex;

  &__dialogs {
    width: 30%;
  }

  &__messages {
    width: 70%;
  }
}
</style>
