<template>
  	<div class="el-main">
  		<el-carousel :interval="5000" arrow="always">
		    <el-carousel-item v-for="item in src" :key="item">
		     	<img :src="item">
		    </el-carousel-item>
		</el-carousel>
		<div class="exhead">
			<span>全部实验</span>
			<span style="float: right;font-size: 14px">更多></span>
		</div>
		<div>
			<div class="excontent" v-for="item in data">
        <router-link :to="/detial/+item.id">
				<a href="">
					<el-col :span="6">
						<div class="excontent_left"><img :src="imgsrc+item.image"></div>
					</el-col>
  					<el-col :span="18">
  						<div class="excontent_right">
  							<h4>{{item.coname}}</h4>
  							<p class="sub-text">江苏大学 {{item.tcollege}} {{item.tname}}</p>
  							<P class="caption-brief">{{item.cinfo}}</P>
  							<p class="sub-text">创建时间：{{item.createtime}}</p>
  						</div>
  					</el-col>
					</a>
          </router-link>
			</div>
		</div>
		<div class="morecourse">
			<div class="Load_more">
				加载更多
			</div>
		</div>
  	</div>
</template>

<script type="text/javascript">
  import exfooter from '../footer/footer.vue';
  import exheader from '../header/header.vue';
  import { requestLogin,getCourse,baseImge} from '@/api/api';
	export default {
		name:"hoem",
    	components:{
	      	exfooter,
	      	exheader
	    },
		data(){
			return {
				src:[require("@/assets/5.jpg"),require("@/assets/3.jpg"),require("@/assets/7.jpg")],
        data:[],
        imgsrc:baseImge,
			}
		},
    methods:{
      getCourseInfo(){
        getCourse().then(res => {
          this.data = res.data.data;
        })
      }
    },
    mounted(){
      this.getCourseInfo();
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
  .exhead{
  	height: 100px;
  	line-height: 100px;
  	font-size: 16px;
  }
  .excontent{
  	height: 180px;
  	width:100%;
  	box-shadow: 0 5px 10px 0 rgb(0,0,0,0.1);
  	-webkit-box-shadow:0 5px 10px 0 rgb(0,0,0,0.1);
  	margin-bottom: 30px;
  }
  .excontent img{
  	width: 100%;
  }
 .excontent_left{
 	height: 150px;
 	overflow: hidden;
 	padding: 10px;
 }
 .excontent_right{
 	padding: 10px;
 }
 .excontent_right h4{
 	font-size: 18px;
 	margin-top: 10px;
    margin-bottom: 10px;
    font-family: inherit;
    font-weight: 500;
    line-height: 1.1;
    color: inherit;
 }
 .sub-text{
 	color: #93999f;
 	margin:0 0 10px;
 	font-size: 14px;
 }
 .caption-brief{
 	height: 42px;
 	overflow: hidden;
 	margin: 0 0 10px;
 	font-size: 14px;
 	color: #333;
 }
 .excontent a{
 	text-decoration: none;
 	color:#333; 
 	display: block;
 	width: 100%;
 	height: 100%;
 }
 .excontent a:hover{
 	box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
    -webkit-box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
 }
 .morecourse{
 	height: 80px;
 	text-align: center;
 	font-size: 16px;
 	color: #6c6c6c;
 }
 .Load_more{
 	height: 40px;
 	position:relative;
 	top:40px;
 }
 .Load_more:before{
 	content: '';                 /*CSS伪类用法*/
    position: absolute;         /*定位背景横线的位置*/
    top: 10px;
    left: 0;
    background: rgb(238,238,238,1);       /*宽和高做出来的背景横线*/
    width: 46%;
    height: 1px;
 }
  .Load_more:after{
 	content: '';                 /*CSS伪类用法*/
    position: absolute;         /*定位背景横线的位置*/
    top: 10px;
    right: 0;
    background: rgb(238,238,238,1);       /*宽和高做出来的背景横线*/
    width: 46%;
    height: 1px;
 }
</style>
<style>
	.el-carousel__container{
		height: 400px;
	}
</style>