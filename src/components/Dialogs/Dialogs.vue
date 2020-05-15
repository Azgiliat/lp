<template>
  <div class="dialogs">
    <div class="dialogs__header header">
      <p class="header__name">
        Сообщения<span class="header__number">{{numberOfMessages}}</span>
      </p>
    </div>
    <ul class="dialogs__list">
      <li @click="$emit('chooseDialog', dialog.id)" class="dialogs__item" v-for="dialog in dialogs" :key="dialog.subject">
        <Dialog class="dialogs__dialog" :dialog="dialog" :currentDialogId="currentDialogId" />
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Dialog from './Dialog.vue';

  export default {
    name: "Dialogs",
    props: {
      dialogs: {
        type: Array,
        require: true
      },
      currentDialogId: {
        type: [Number, String],
        require: false
      }
    },
    components: {
      Dialog
    },
    computed: {
      ...mapGetters('chats', {
        numberOfMessages: 'getNumberOfMessages'
      })
    }
  }
</script>

<style lang="scss" scoped>
.dialogs {
  background-color: #F3F6F8;

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}

.header {
  padding: 24px 0 16px 21px;

  &__name {
    font-size: 14px;
    line-height: 20px;
    color: $grey5;
  }

  &__number {
    font-weight: bolder;
    color: $grey3;margin-left: 10px;
  }
}
</style>
