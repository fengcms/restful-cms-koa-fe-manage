<template>
  <div id="app">
    <router-view :name="$router.path" />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
