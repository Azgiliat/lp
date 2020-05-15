<template>
  <div class="correspondence">
    <transition-group ref="list" tag="ul" name="message" class="correspondence__list" v-on:after-enter="afterEnter">
      <li class="correspondence__item" v-for="(message, index) in messages"
          :key="message.created + message.author + index">
        <Message @errorIn="scrollMessages" class="correspondence__message" :message="message"
                 :ref="`message-${index}`"/>
      </li>
    </transition-group>
  </div>
</template>

<script>
  import Message from "./Message.vue";

  export default {
    name: "Correspondence",
    props: {
      messages: {
        type: Array,
        require: true
      }
    },
    components: {
      Message
    },
    methods: {
      scrollMessages(height) {
        const list = this.$refs.list.$el;
        if (list.scrollHeight > list.clientHeight) {
          const duration = 700;
          const start = performance.now();

          const animate = () => {
            const progress = (performance.now() - start) / duration;

            list.scrollTop += height * progress;

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      afterEnter(el) {
        this.$nextTick(() => {
          this.scrollMessages(el.clientHeight);
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.correspondence {
  flex-grow: 1;
  padding-bottom: 40px;
  max-height: 640px;

  &__list {
    list-style: none;
    padding: 0 15px 0 40px;
    margin: 0;

    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: scroll;

    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__item {
    transition: all $transition;
  }

  &__item:not(:last-child) {
    margin-bottom: 20px;
  }

  &__item:first-child {
    margin-top: auto;
  }
}
</style>
