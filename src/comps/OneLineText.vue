<template>
  <el-tooltip effect="dark" :content="text" placement="top-start" :open-delay="200" :enterable="false" :disabled="!text">
    <div
      :class="`one-line-text ${(link && link !== 'null') || isClick ? 'one-line-text-link': ''}`"
      :style="`height: ${height};`"
      @click="handleClick"
    >

      <template v-if="link && link !== 'null'">
        <a
          v-if="mail || isWebUrl(link)"
          :href="`${mail ? 'mailto:' : ''}${link}`"
          :target="`${link.includes('mailto') ? '' : '_blank'}`"
        >

          <i v-if="icon" :class="icon" />
          {{ text || '-' }}
        </a>
        <router-link v-else :to="link">
          <i v-if="icon" :class="icon" />
          {{ text || '-' }}
        </router-link>
      </template>
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
    height: { type: String, default: 'auto' },
    text: { type: String, default: '' },
    icon: { type: String, default: '' },
    link: { type: String, default: '' },
    mail: { type: Boolean, default: false }
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
    isWebUrl (url) {
      const urlType = ['http', 'ftp']
      return urlType.some(r => url.includes(r))
    },
    handleClick (evt) {
      this.$emit('click', evt)
    }
  }
}
</script>
<style lang="scss" scoped>
.one-line-text {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  &.one-line-text-link {
    cursor: pointer;color: #409EFF;
  }
}
</style>
