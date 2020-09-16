<template>
  <div class="article-new">
    <topnav @back= "back" :text= "text"></topnav>
    <scroll  :probe-type="probeType"
      :listen-scroll="listenScroll" ref="articleContentList"
      class="article-new-content"
    >
    <div>
      <div class="basicmessage" v-if= "showbasic">
        <div class="title">[两万字]面试官：听说你很懂集合源码，接我二十道问题</div>
        <div class="imformation">
          <div class="time">2020-06-28</div>
          <div class="viewnum">浏览量:{{hits}}</div>
        </div>
        <div class="author">
          <div class="imgdiv">
            <img  src="../../assets/logo.png" class="img">
          </div>
          <div class="authorimformation">
            <div class="authorname">小米粥</div>
            <div class="experience">码龄:3年</div>
          </div>
        </div>
      </div>
      <div class="sklentondiv" v-if= "!showbasic">
        <van-skeleton title :row="3" class="mysklenton"/>
        <!-- <van-skeleton title avatar class="mysklentonavatar"/> -->
      </div>

        <div class="hr"></div>
        <div v-html="compiledMarkdown" class="macked" v-if= "showmacked"></div>
        <div class="sklentondiv" v-if= "!showmacked">
          <van-skeleton title :row="3" class="mysklenton"/>
          <!-- <van-skeleton title avatar class="mysklentonavatar"/> -->
        </div>
        <div class="hrweight"></div>
        <commentarea v-if= "showcommentarea" :list= "commentcontent"></commentarea>
        <div class="sklentondiv" v-if= "!showcommentarea">
          <van-skeleton title :row="3" class="mysklenton"/>
          <!-- <van-skeleton title avatar class="mysklentonavatar"/> -->
        </div>
        <div class="hrweight"></div>
      </div>
    </scroll>

    <comment @commentsubmit= "commentsubmit" @like= "like" @good= "good" :infogood= "infogood" :infolike= "infolike"
    :goodnum= 'goods' :likenum= "likes"></comment>
  </div>
</template>

<script>
import comment from "@/base/comment/comment"
import commentarea from "@/base/commentarea/commentarea"
import topnav from '@/components/top-nav/top-nav'
import { commentItem } from "@/common/js/comment"
import { createTime } from "@/common/js/time"
import { Icon, Skeleton } from 'vant';
import marked from 'marked'
import hljs from "highlight.js";
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/vs2015.css'
// import 'highlightjs-line-numbers.js'
import { getdetail, getcomments, postcomments, addhit, addgood, addlike, sublike, subgood } from "@/api/article"
import scroll from '@/base/scroll/scroll'
// import VueDirectiveImagePreviewer from 'vue-directive-image-previewer'
// import 'vue-directive-image-previewer/dist/assets/style.css'
import Vue from 'vue';

Vue.use(Skeleton);
// Vue.use(VueDirectiveImagePreviewer, {
//   zIndex: 9999,  //层级显示
//   previewSize: 3 //三倍图
// })
export default {
  data() {
    return {
      articleContent: '',
      articleTitle: '',
      text: '最新文章',
      showbasic: false,
      showmacked: false,
      showcommentarea: false,
      commentcontent: [],
      articleid: 0,
      hits: 0,
      likes: 0,
      goods: 0,
      infogood: false,    //点赞登陆的时候就已经拿到全部的id了，还没做
      infolike: false     //收藏
    }
  },
  methods: {
    back() {
      this.$router.back()
    },
    getlogin() {
      if (!this.$store.getters.getIsLogin) {        //检验登陆  
        console.log('未登录')
        return 0
      } else {
        return 1
      }
    },
    _getdetail(id) {
      getdetail(id).then(res => {
        if (res.data.errno == 0) {
          console.log(res)
          this.articleContent = res.data.data.content
          this.showbasic = true
          this.showmacked = true
          this.showcommentarea = true
          this.articleTitle = res.data.data.title
          this.hits = res.data.data.hits
          this.likes = res.data.data.likes
          this.goods = res.data.data.goods

          addhit(id, this.hits).then(res => {
            if (res.data.errno == 0) {
              console.log(res)
            }
          })

          if (!this.getlogin()) {  //检验登陆
            return
          }     

          let mygood = this.$store.getters.getCurrentUser.goods.split(',')
          if (mygood.indexOf(this.$route.params.id)> -1) {
            this.infogood = true
          }

          let mylike = this.$store.getters.getCurrentUser.likes.split(',')
          if (mylike.indexOf(this.$route.params.id)> -1) {
            this.infolike = true
          }
        }
      })
    },

    _getcomments(id) {
      getcomments(id).then(res => {
        if (res.data.errno == 0) {
          this.articleid = res.data.data.id
          let mysqlcomment = JSON.parse(res.data.data.content)
          for (let i in mysqlcomment) {
            this.commentcontent.push(mysqlcomment[i])
          }
        }
        // console.log(res)
        // // console.log(mysqlcomment)
        // mysqlcomment.push(mysqlcomment[0])
        // console.log(JSON.stringify(this.commentcontent))
        // this.commentcontent.push(mysqlcomment)
        // console.log(this.commentcontent)
        // dataStr=JSON.stringify(this.commentcontent[0])
        // console.log(dataStr)
      })
    },
    commentsubmit(content) {
      if (!this.getlogin()) {  //检验登陆
        return
      }  

      if (content == '') {
        console.log('不能评论为空')
        return
      }
      let userinfo = this.$store.getters.getCurrentUser     //登陆后用户的信息

      const nowtime = Date.now()                             //获取当前时间戳
      let item = commentItem(userinfo.avatar, userinfo.username, content, createTime(nowtime))                             //comment(avatar, username, content, time)

      this.commentcontent.push(item)                              //评论
      console.log(this.commentcontent)                                //打印已经评论的总评论

      let dataStr=JSON.stringify(this.commentcontent)                       //转化为json字符串，准备上传到数据库
      let data = new FormData()
      data.append('comments', dataStr)
      data.append('id', this.articleid)
      postcomments(data).then(res => {
        console.log(res)
      })
    },
    like() {
      // console.log(this.likes)
      if (!this.getlogin()) {  //检验登陆
        return
      } 

      if (!this.infolike) {
        let idstr = ''
        console.log(this.$store.getters.getCurrentUser.likes)
        if (this.$store.getters.getCurrentUser.likes == "") {
          idstr = this.$store.getters.getCurrentUser.likes + `${this.$route.params.id}`
        } else {
          idstr = this.$store.getters.getCurrentUser.likes + `,${this.$route.params.id}`
        }

        addlike(this.$route.params.id, idstr, this.likes).then(res => {
          console.log(res)
          let info = this.$store.getters.getCurrentUser
          info.likes = idstr
          this.$store.commit('updateUserStatus',info);

          this.likes += 1
          this.infolike = true
        })
      } else {
        let mylike = this.$store.getters.getCurrentUser.likes.split(',')
        mylike.splice(mylike.indexOf(this.$route.params.id))
        let idstr = ''
        for (let i in mylike) {
          if (mylike.length - 1> i){
            idstr += `${mylike[i]},`
          } else {
            idstr += `${mylike[i]}`
          }
        }
        sublike(this.$route.params.id, idstr, this.likes).then(res => {
          console.log(res)
          let info = this.$store.getters.getCurrentUser
          info.likes = idstr
          this.$store.commit('updateUserStatus',info);
          this.likes -= 1
          this.infolike = false
        })
      }
    },
    good() {
      if (!this.getlogin()) {  //检验登陆
        return
      } 

      if (!this.infogood) {
        let idstr = ''
        if (this.$store.getters.getCurrentUser.goods == '') {
          idstr = this.$store.getters.getCurrentUser.goods + `${this.$route.params.id}`
        } else {
          idstr = this.$store.getters.getCurrentUser.goods + `,${this.$route.params.id}`
        }
        addgood(this.$route.params.id, idstr, this.goods).then(res => {
          console.log(res)
          let info = this.$store.getters.getCurrentUser
          info.goods = idstr
          this.$store.commit('updateUserStatus',info);
          this.goods += 1
          this.infogood = true
        })
      } else {
        let mygood = this.$store.getters.getCurrentUser.goods.split(',')
        mygood.splice(mygood.indexOf(this.$route.params.id))
        let idstr = ''
        for (let i in mygood) {
          if (mygood.length - 1> i){
            idstr += `${mygood[i]},`
          } else {
            idstr += `${mygood[i]}`
          }
        }
        subgood(this.$route.params.id, idstr, this.goods).then(res => {
          console.log(res)
          let info = this.$store.getters.getCurrentUser
          info.goods = idstr
          this.$store.commit('updateUserStatus',info);
          this.goods -= 1
          this.infogood = false
        })
      }

    }
  },
  created() {
    this.listenScroll = true
    this.probeType = 3
  },
  mounted() {
  //  console.log(this.$route);
  //  console.log(this.text)
  marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function (str, lang) {
  	// 此处判断是否有添加代码语言
        if (lang && hljs.getLanguage(lang)) {
          try {
            // 得到经过highlight.js之后的html代码
            // console.log(str, lang)
            const preCode = hljs.highlight(lang, str, true).value
            // console.log(preCode)
            // 以换行进行分割
            const lines = preCode.split(/\n/)
            // console.log(lines)
            // 添加自定义行号
            let html = lines.map((item, index) => {
              // console.log(item, index)
              if (index < 9) {
                return `<li> ${index + 1}| <span class="line-num" data-line="${index + 1}"></span>${item}</li>`
              } else if (9 <= index < 99) {
                return `<li>${index + 1}| <span class="line-num" data-line="${index + 1}"></span>${item}</li>`
              } else {
                return `<li>${index + 1}| <span class="line-num" data-line="${index + 1}"></span>${item}</li>`
              }

            }).join('')
            // console.log(html)
            html = '<ol>' + html + '</ol>'
            // 添加代码语言
            if (lines.length) {
              html += '<b class="name">' + lang + '</b>'
            }
            return '<pre class="hljs myhljs"><code>' +
              html +
              '</code></pre>'
          } catch (__) {}
        }
      // 未添加代码语言，此处与上面同理
        const preCode = md.utils.escapeHtml(str)
        const lines = preCode.split(/\n/).slice(0, -1)
        let html = lines.map((item, index) => {
          return '<li><span class="line-num" data-line="' + (index + 1) + '"></span>' + item + '</li>'
        }).join('')
        html = '<ol>' + html + '</ol>'
        return '<pre class="hljs"><code>' +
          html +
          '</code></pre>'
      },
      pedantic: false,
      gfm: true,
      tables: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false

    }
  );

  // $(document).ready(function() {
  //   $('code.hljs').each(function(i, block) {
  //       hljs.lineNumbersBlock(block);
  //   });
  // });

   this._getdetail(this.$route.params.id)
   this._getcomments(this.$route.params.id)
  //  console.log(document.getElementByClassName(".hljs"))
  },
  computed: {
    compiledMarkdown: function() {
      return marked(this.articleContent, {});  //第一个参数是你的markdown文本 第二个参数是选项
    },
    str: function() {
      let arr = this.$route.path.split('/')
      console.log(arr)
      let str = `当前路径为：${arr[1]}>${arr[2]}`
      return str
    },
  },
  components: {
    scroll,
    topnav,
    comment,
    commentarea
  }
}
</script>

<style scoped>
.article-new{
  position: fixed;
  top: 50px;
  bottom: 40px;
  right: 0;
  left: 0;
  z-index: 1000;
  background-color: white;
}
.nav{
  height: 30px;
  display: flex;
  position: fixed;
  top: 50px;
  width: 100%;
  z-index: 100;
  background-color: white;
}
.article-new-content{
  position: fixed;
  top: 50px;
  bottom: 40px;
  width: 100%;
  background-color: white;
}
.macked{
  margin: 10px;
  padding: 10px;
}
.icon-back{
  display: block;
  padding: 5px;
  font-size: 22px;
}
.nav-text{
  margin-top: 5px;
  font-size: 15px;
}
.title{
  font-size: 20px;
  font-weight: 550;
  padding: 10px 10px 10px 15px;
}
.imformation{
  display: flex;
}
.mysklenton{
  margin: 30px 10px 20px 10px;
}
.mysklentonavatar{
  margin: 0px 10px 20px 10px;
}
.time{
  margin: 10px 10px 10px 15px;
  font-size: 12px;
}
.viewnum{
  flex: 1;
  text-align: right;
  margin: 8px 20px 10px 10px;
  font-size: 12px;
}
.author{
  display: flex;
}
.imgdiv{
  height: 40px;
  width: 40px;
  margin-left: 10px;
}
.img{
  height: 35px;
  width: 35px;
  border-radius: 18px;
  padding: 2px;
}
.authorimformation{
  display: block;
  padding: 2px 0 0 10px;
}
.authorname{
  font-size: 13px;
}
.experience{
  font-size: 12px;
}
.hr{
  height: 1.5px;
  background-color: #d8d8d8;
  margin: 4px 20px 4px 20px;
}
.hrweight{
  height: 7px;
  background-color: #eceaea;
}
.myhljs {
  padding: 8px 4px !important;
  border-radius: 5px !important;
  position: relative !important;
}
ol {
  /* list-style: decimal; */
  margin: 0;
  margin-left: 40px;
  padding: 0;
}
li {
  list-style: decimal-leading-zero;
  position: relative;
  padding-left: 10px;
}
.line-num {
  position: absolute;
  left: -40px;
  top: 0;
  width: 40px;
  height: 100%;
  border-right: 1px solid rgba(0, 0, 0, .66);
}
b .name {
  position: absolute;
  top: 2px;
  right: 12px;
  z-index: 10;
  color: #999;
  pointer-events: none;
}
</style>

