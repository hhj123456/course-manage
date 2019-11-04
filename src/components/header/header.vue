<template>
	<el-header style="height: 70px">
  		<el-row :gutter="20">
		  <el-col :span="11" :offset="2">
		  		<div class="head_png">
			  	  	<img src="@/assets/logo-red.svg">
			  	 	<span  class="head_title">基于Ci+Vue的教学实验过程管理系统</span>
		  	 	</div>
		  </el-col>
		  <el-col :span="11">
			 <ul class="head_meun">
			 	<li><a href="">首页</a><span>|</span></li>
			 	<li><a href="">在线教育</a><span>|</span></li>
			 	<li><a href="">帮助文档</a><span>|</span></li>
			 	<li v-if="user.id == ''">
            <router-link to="/login">登录
			 	    <img class="img-circle userImg" src="@/assets/touxiang.svg" style="height: 30px;"></router-link>
        </li>
        <li v-else>
           <!--  <a href="">
                {{user.name}}
                <img class="img-circle userImg" src="@/assets/touxiang.svg" style="height: 30px;">
            </a> -->
            <a href="">
              <el-dropdown>
                <span class="el-dropdown-link">
                  {{user.name}}
                  <img class="img-circle userImg" src="@/assets/touxiang.svg" style="height: 30px;">
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>我的消息</el-dropdown-item>
                  <el-dropdown-item>设置</el-dropdown-item>
                  <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </a>
        </li>
			 </ul>
		  </el-col>
		</el-row>
  	</el-header>
</template>

<script type="text/javascript">
	export default {
		name:"exheader",
    data(){
      return {
        user:{
          id:''
        },//用户信息
      }
    },
    methods:{
      logout(){
        var _this = this;
        this.$confirm('确认退出吗?', '提示', {
          //type: 'warning'
        }).then(() => {
          sessionStorage.removeItem('user');
          _this.$router.push('/login');
        }).catch(() => {

        });
      }
    },
    mounted() {
      var user = sessionStorage.getItem('user');
      if (user) {
        this.user = JSON.parse(user);
        console.log(this.user);
      }

    }
	}
</script>
<style scoped>
.el-header, .el-footer {
    color: #333;
    height: 70px;
  }
  .el-header{
  	border-bottom: 1px solid #e7e7e7;
  }
  .el-main {
    width: 90%;
    margin: 0 auto;
  }
  .header_btn{
  	display: inline-block;
  }
  .head_title{
  	color: #333;
  	font-size: 26px;
  	line-height: 70px;
  	vertical-align:middle;
  }
  img{
  	vertical-align:middle;
  }
  .head_png{
  	cursor:pointer;
  }
  .head_meun{
  	list-style: none;
  	margin-top: 0px;
  	line-height: 70px;
  }
  .head_meun li{
  	float: left;
  }
  .head_meun >li >a{
  	text-decoration: none;
  	padding-left: 20px;
  	padding-right: 20px;
  	color: #777;
  	font-size: 15px;
  }
  .head_meun >li >a:hover{
  	color: #333;
  }
  .img-circle{
  	border-radius: 50%;
  	padding-left: 5px;
  }
</style>