<template>
  <el-tooltip effect="dark" :content="text" placement="top-start" :open-delay="200">
    <div :class="`one-line-text ${link || isClick ? 'one-line-text-link': ''}`" :style="`height: ${height};`" @click="handleClick">
      <router-view v-if="link" :to="link">
        <i v-if="icon" :class="icon" />
        {{ text || '-' }}
      </router-view>
      <template v-else>
        <i v-if="icon" :class="icon" />
        {{ text || '-' }}
      </template>
    </div>
  </el-tooltip>
</template>
<script>
export default {
  name: 'OneLineText',
  props: {
    height: { type: String, default: '18px' },
    text: { type: String, default: '' },
    icon: { type: String, default: '' },
    link: { type: String, default: '' }
  },
  data () {
    return {}
  },
  computed: {
    isClick () {
      return Object.keys(this.$listeners).length !== 0
    }
  },
  methods: {
    handleClick (evt) {
      this.$emit('click', evt)
    }
  }
}
</script>
<style lang="scss" scoped>
.one-line-text {
  display: inline-block;
  overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;

  &.one-line-text-link {
    cursor: pointer;color: #409EFF;
  }
}
</style>
