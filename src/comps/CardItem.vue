<template>
  <FlexItem>
    <div :class="`niao-card-item niao-card-item-${color}`" :title="`${label}：${value}`" @click="goLink">
      <div :class="`niao-card-item-value ${valueSize}`">
        <p v-if="value !== ''">
          <span v-if="prefix" class="niao-card-item-value-prefix">{{ prefix }}</span>
          {{ value }}
          <span v-if="suffix" class="niao-card-item-value-suffix">{{ suffix }}</span>
        </p>
        <p v-else>...</p>
      </div>
      <div class="niao-card-item-label">
        <span>{{ label }}</span>
        <i class="el-icon-arrow-right" />
      </div>
      <div class="niao-card-item-icon">
        <i :class="`${icon}`" />
      </div>
    </div>
  </FlexItem>
</template>
<script>
export default {
  name: 'CardItem',
  props: {
    color: { type: String, default: 'primary' },
    value: { type: [String, Number], default: '' },
    label: { type: String, default: '' },
    icon: { type: String, default: '' },
    to: { type: String, default: '' },
    prefix: { type: String, default: '' },
    suffix: { type: String, default: '' }
  },
  data () {
    return {}
  },
  computed: {
    valueSize () {
      const length = this.value.toString().length
      if (length < 7) return 'big'
      if (length < 10 && length >= 7) return 'mid'
      if (length < 15 && length >= 10) return 'small'
      else return 'mini'
    }
  },
  methods: {
    goLink () {
      this.to && this.$router.push(this.to)
    }
  }
}
</script>
<style lang="scss">
.niao-card-item {
  margin-bottom: 18px;position: relative;height: 110px;border-radius: 4px;color: #fff;overflow: hidden;cursor: pointer;
  $colors: (
    'green': #73d13d, 'orange': #ffa940, 'red': #ff4d4f, 'blue': #40a9ff,
    'cyan': #13c2c2, 'purple': #9254de, 'magenta': #f759ab, 'yellow': #ffc53d
    );
  @each $type, $color in $colors {
    &-#{$type} {
      $dark: mix($color, #000, 85%);
      $light: mix($color, #fff, 85%);
      text-shadow: 1px 1px 0px $dark;
      background: $color;
      box-shadow: 0 0 0 1px $dark;
      transition: all ease 0.15s;
      .niao-card-item-label {
        border-top: 1px solid $dark;
        transition: all ease 0.15s;
      }
      &:hover {
        text-shadow: 1px 1px 0px $dark;
        background: $light;
        box-shadow: 0 0 0 1px $dark;
        .niao-card-item-label {
          border-top: 1px solid $dark;
        }
      }
    }
  }
  &-value, &-label {
    display: flex;align-items: center;padding: 0 20px;position: absolute;left: 0;right: 0;z-index: 1;
  }
  &-value {
    height: 72px;font-size: 48px;font-weight: bold;top: 0;border-radius: 4px 4px 0 0;
    &.big { font-size: 48px; }
    &.mid { font-size: 36px; }
    &.small { font-size: 24px; }
    &.mini { font-size: 18px; }
    &-prefix, &-suffix {font-size: 18px;}
    &-prefix {padding-right: 5px;}
    &-suffix {padding-left: 5px;}
    p {
      display: flex;align-items: baseline;
    }
  }
  &-label {
    height: 36px;bottom: 0;background: rgba(#000, .03);border-radius: 0 0 4px 4px;font-size: 15px;
    justify-content: space-between;
  }
  &-icon {
    position: absolute;right: -35px;top: -35px;font-size: 100px;z-index: 0;opacity: .9;
    display: flex;align-items: center;width: 130px;height: 140px;
    justify-content: center;transform: rotate(15deg);
  }
}
</style>
