<template>
  <router-view id="app" :name="$router.path" />
</template>

<script>
export default {
  name: 'App'
}
</script>
