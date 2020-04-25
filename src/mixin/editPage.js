export default {
  data () {
    return {
      pageInfo: {
        editId: this.$route.params.id
      }
    }
  },
  created () {
    console.log(this.pageInfo.editId)
  }
}
