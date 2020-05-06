import { ApiPre } from '@/config'
export default {
  data () {
    return {
      progress: 0
    }
  },
  methods: {
    upload (file) {
      return new Promise((resolve, reject) => {
        const formData = new FormData()
        formData.set('file', file)
        const xhr = new XMLHttpRequest()
        xhr.open('post', ApiPre + 'upload')
        xhr.onload = () => {
          if (xhr.status === 200) {
            const res = JSON.parse(xhr.response || xhr.responseText)
            if (res.status === 0) {
              resolve({ name: file.name, path: res.data.path })
            } else {
              this.$message.error('图片上传失败')
            }
            this.progress = 0
          } else {
            this.$message.error('图片上传失败')
            this.progress = 0
          }
        }
        xhr.upload.onprogress = (e) => {
          // 上传进度
          if (e.lengthComputable) {
            this.progress = ~~(e.loaded / e.total * 100)
          }
        }
        xhr.send(formData)
      })
    }
  }
}
