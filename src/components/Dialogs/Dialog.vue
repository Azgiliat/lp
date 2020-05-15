<template>
  <div class="dialog" :class="isActive && 'dialog--active'">
    <div class="dialog__header">
      <p class="dialog__subject">
        {{dialog.subject}}
      </p>
      <p class="dialog__date">
        {{dialog.created | subjectDate}}
      </p>
    </div>
    <div class="dialog__message message">
      <p class="message__text">
        {{dialog.parts[0].text}}
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Dialog",
    props: {
      dialog: {
        type: Object,
        require: true
      },
      currentDialogId: {
        type: [Number, String],
        require: false
      }
    },
    computed: {
      isActive() {
        return this.dialog.id === this.currentDialogId;
      }
    },
    filters: {
      subjectDate(str) {
        const dictionary = {
            '01': 'января',
            '02': 'февраля',
            '03': 'марта',
            '04': 'апреля',
            '05': 'мая',
            '06': 'июня',
            '07': 'июля',
            '08': 'августа',
            '09': 'сентября',
            '10': 'октября',
            '11': 'ноября',
            '12': 'декабря'
          },
          day = str.substring(8, 10).charAt(0) === '0' ? str.substring(8, 10).charAt(1) : str.substring(8, 10),
          month = dictionary[str.substring(5, 7)],
          year = str.substring(0, 4);

        return `${day} ${month} ${year}`
      }
    }
  }
</script>

<style lang="scss" scoped>
.dialog {
  border-top: 1px solid $grey2;
  padding: 21px;
  position: relative;

  &__header {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }

  &__subject, &__date {
    margin: 0;
  }

  &__subject {
    font-size: 14px;
    line-height: 20px;
    color: $dark;
    font-weight: bolder;
  }

  &__date {
    font-size: 10px;
    line-height: 14px;
    text-align: right;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-left: auto;
    color: $grey4;
  }

  &::before {
    content: '';
    position: absolute;
    width: 2px;
    height: 100%;
    top: 0;
    left: 0;
    background-color: $blue2;
    transition: transform $transition;
    transform: scaleY(0);
  }

  &--active::before {
    transform: scaleY(1);
  }

  &:last-child {
    border-bottom: 1px solid $grey2;
  }
}

.message {
  &__text {
    margin: 0;
    font-size: 13px;
    line-height: 18px;
    color: $grey10;
    max-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
