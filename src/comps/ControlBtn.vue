<template>
  <el-button :type="type" :loading="loading" :size="calcSize" :icon="icon" @click="handleClick">
    <slot />
  </el-button>
</template>
<script>
export default {
  name: 'ControlBtn',
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: 'small'
    },
    icon: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    calcSize () {
      return this.$parent.$attrs.size || this.size
    }
  },
  methods: {
    handleClick (evt) {
      this.$emit('click', evt)
    }
  }
}
</script>
