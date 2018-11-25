<template>
	<div class="main">
		<div class="course-head">
			<el-breadcrumb separator="/" class="breadcrumb-inner">
				<el-breadcrumb-item v-for="item in $route.matched" :key="item.path" >
					{{ item.name }}
				</el-breadcrumb-item>
			</el-breadcrumb>
			<h3>{{course.coname}}</h3>
			<div class="course-tag">
				<a href="">开始实验 | 尚未完结</a>
				<div class="course-tag-flag"></div>
				<span>
					<p>实验人数</p>
					<p>67人</p>
				</span>
				<span>
					<p>实验难度</p>
					<p>中等</p>
				</span>
				<span>
					<p>实验时长</p>
					<p>8周</p>
				</span>
			</div>
		</div>
		<div class="coures-content">
			<el-tabs v-model="activeName" @tab-click="handleClick">
			    <el-tab-pane label="课程介绍" name="first">
			    	<p class="describe">{{course.cinfo}}</p>
			    	<p class="teacher">实验老师信息</p>
			    	<p>{{course.tname}}</p>
			    	<p>江苏大学 {{course.tcollege}}</p>
			    </el-tab-pane>
			    <el-tab-pane label="实验章节" name="second">
			    	<div class="excontent" v-for="(item,index) in data">
				    	<div class="exchapter" @click.stop.prevent="expand(index)">
				    		<div class="exchapter_left">
				    			{{item.caname}}
				    		</div>
				    		<div class="exchapter_right">
				    			<i class="el-icon-arrow-down" v-show="expandindex[index]"></i>
				    			<i class="el-icon-arrow-up" v-show="!expandindex[index]"></i>
				    		</div>
				    	</div>
				    	<el-collapse-transition>
					    	<div v-show="!expandindex[index]">
						    	<div v-for="(item1,index1) in item.experimentinfo">
						    		<div style="height: 5px"></div>
						    		<a href="javascript:;" @click="rouerto(item1.id,item1.isclass)">
						    		<div class="exsection">
							    		<span class="exsection_left">{{index+1}}.{{index1+1}}  {{item1.ename}}</span>
							    		<span class="exsection_right" :class="item1.isclass == 0 ? info : danger ">
							    			{{item1.isclass == 0 ? '未开始':'已开始'}}
							    		</span>
						    		</div>
						    		</a>
						    		<div style="height: 5px"></div>
						    	</div>
					    	</div>
				    	</el-collapse-transition>
			    	</div>
			    </el-tab-pane>
			    <el-tab-pane label="评论" name="third">评论</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>
<script>
	import {getChpaterExcement} from '@/api/api';
	export default{
		name : 'exdetial',
		data(){
			return {
				activeName:'first',
				expandindex:[],
				data:[],
				danger:'danger',
				info:'info',
				course:{},//课程
			}
		},
		methods:{
			handleClick(tab, event) {
		        console.log(tab, event);
		    },
		    expand(index){
		    	this.expandindex[index] = !this.expandindex[index];
            	this.$set(this.expandindex,index,this.expandindex[index])
		    },
		    getChapers(){
		    	let params ={
		    		coid : this.$route.params.num
		    	}
		    	getChpaterExcement(params).then(res => {
		    		// console.log(res.data.course);
		    		this.course= res.data.course;
		    		this.data = res.data.data;
		    	});
		    	// console.log(this.$route.params.num);
		    },
		    //跳转
		    rouerto(id,isclass){
		    	if(isclass == 0){
		    		this.$message.error('此实验室尚未开启，请耐心等待！');
		    	}else{
		    		this.$router.push({
			            name:'开始试验',
			            params:{
			              id:id
			            }
			        }); 
		    	}
		    }
		},
		mounted(){
			this.getChapers();
		}
	}
</script>
<style scoped>
	.main{
		width: 90%;
		margin: 0 auto;
		margin-top: 30px;
	}
	.course-head{
		background: url('http://img.mukewang.com/55af49ad000116a506000338.jpg') center/cover no-repeat;
    	color: #FFF;
    	margin-bottom: 30px;
    	overflow: hidden;
    	height: 220px;
    	padding: 0 5%;
	}
	.breadcrumb-inner{
		height: 40px;
		line-height: 40px;
		font-size: 15px;
	}
	.course-head h3{
		font-weight: bold;
		color: white;
		font-size: 24px;
	}
	.course-tag{
		position: relative;
	}
	.course-tag-flag{
		width: 220px;
		display: inline-block;
	}
	.course-tag a{
		background-color: #f01414;
	    color: #FFF;
	    font-size: 14px;
	    text-decoration: none;
	    display: inline-block;
	    height: 42px;
	    width: 183px;
	    line-height: 42px;
	    text-align: center;
	    position: absolute;
	    top: 20px;
	}
	.course-tag span{
		display: inline-block;
		font-size: 14px;
		width: 120px;
	}
	.describe{
		font-size: 16px;
		line-height: 30px;
		text-indent:2em;
		color: #333;
	}
	.teacher{
		font-size: 24px;
		color: #333;
		margin: 0px;
	}
	.coures-content{
		padding-bottom: 100px;
	}
	.exchapter{
		height: 50px;
		line-height: 50px;
		border-bottom: 1px solid #ddd;
		color: #333;
		cursor: pointer;
		font-size: 15px;
	}
	.exchapter_left{
		float: left;
	}
	.exchapter_right{
		float: right;
		width: 50px;
		font-size: 20px;
	}
	.exsection{
		padding: 5px 15px 5px 5px;
		height: 30px;
		line-height: 30px;
		background-color: #f3f5f7;
		font-size: 14px;
		color: #787d82;
		width: 95%;
	}
	.exsection_right{
		float: right;
	}
	.exsection:hover{
		background-color: #333;
		color: #fff;
		cursor: pointer;
	}
	.danger{
		color: #F56C6C;
	}
	.info{
		color: #909399;
	}
</style>
<style type="text/css">
	.el-breadcrumb__inner{
		color: white!important;
	}
	a{
		text-decoration: none;
	}
</style>