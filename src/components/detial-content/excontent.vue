<template>
	<div class="excontent">
		<el-tabs type="border-card"  v-model="activeName" v-loading="testLoading">
		  <el-tab-pane name="first">
		    <span slot="label"><i class="el-icon-document"></i> 预习测试</span>
		    <div v-if="questions.length > 0">
		    <div v-for="(item,index) in questions">
		    	<div class="test-header">
		    		{{index+1}}. 
		    		<span style="color: red"> 
		    			[{{item.type == 0 ? '单选题' : '多选题'}}]
		    			{{item.type == 0 ? singleCount : multiCount}}分
		    		</span> 
		    		{{item.topic}}
		    	</div>
		    	<div v-if="!isFinishtest">
			    	<div class="test-select" v-if = "item.type == 0">
			    		<el-radio-group v-model="stuselect[index].select">
						    <el-radio 
						    	:label="index1" 
						    	:key="index1" 
						    	v-for="(anser,index1) in item.soptions" 
						    	border
						    	style="">{{num[index1]}} 、 {{anser.value}}</el-radio>
						</el-radio-group>
			    	</div>
			    	<div class="test-select" v-else>
			    		<el-checkbox-group v-model="stuselect[index].select">
						    <el-checkbox 
						    	:label="index1" 
						    	:key="index1" 
						    	v-for="(anser,index1) in item.soptions" 
						    	border
						    	style="">{{num[index1]}} 、 {{anser.value}}</el-checkbox>
						</el-checkbox-group> 
			    	</div>
		    	</div>
		    	<div class="pselectdiv" v-else>
		    		<div>
		    			<span>正确答案：</span><span v-for="correct in item.correctArr">{{num[correct]}}</span> 
		    			<span>你的答案：</span><span v-for="stu in item.stuselect">{{num[stu]}}</span>
		    			<span :class="[item.isture == 1 ? activeClass : errorClass]">({{item.isture == 1 ? '正确' : '错误'}})</span>
		    		</div>
		    		<div v-if="item.isture == 1">
		    			<p v-for="(anser,index1) in item.soptions" class="pselect" :class="[anser.isture == 1 ? activeBorder : '']">{{num[index1]}} 、 {{anser.value}}</p>
		    		</div>
		    		<div v-else>
		    			<p v-for="(anser,index1) in item.soptions" class="pselect" :class="[anser.isture == 1 ? errorBorder : '']">{{num[index1]}} 、 {{anser.value}}</p>
		    		</div>
		    	</div>
<!-- 		    	<div class="test-select">
		    		<div v-for="(anser,index1) in item.soptions" style="margin-bottom: 10px">
		    			<el-radio v-model="radio[index]" :label="index1" border>{{anser.value}}</el-radio>
		    		</div>
		    	</div> -->
		    </div>
		    <el-button type="danger" class="submit" @click="complete">交卷</el-button>
		    </div>
		    <div style="height: 500px" v-else>
		    	<p class="tagtitle">暂无测试题！</p>
		    </div>
		  </el-tab-pane>
		  <el-tab-pane name="second" class="second_content">
		  	<span slot="label"><i class="el-icon-time"></i>试验签到</span>
		  	<div class="sign">
				<P class="date">当前日期:{{date}}</P> 
				<P class="time">时间:{{time}}</P>  
				<p class="date">签到时间:{{starttime}}</p>	
				<p class="date">实验时长:{{usetime}}</p>
				<p class="date">签退时间:{{endtime}}</p>
				<el-button type="success" @click.stop.prevent="start">签到</el-button>	 
				<el-button type="danger" @click.stop.prevent="stop">签退</el-button>		
		  	</div>
		  </el-tab-pane>
		  <el-tab-pane name="third">
		  	<span slot="label"><i class="el-icon-tickets"></i>目的及原理</span>
		  	<div class="third_content" v-if="purpose.length > 0">
		  		<div class="" v-for = "(item,index) in purpose">
		  			<div class="list">{{capital[index]}}、{{item.retitle}}</div>
		  			<div class="list_content" v-html="item.recont">
		  				<!-- {{item.recont}} -->
		  			</div>
		  		</div>
		  	</div>
		  	<div style="height: 500px" v-else>
		    	<p class="tagtitle">暂无目的及原理的描述，请联系老师！</p>
		    </div>
		  </el-tab-pane>
		  <el-tab-pane name="fourth">
		  	<span slot="label"><i class="el-icon-edit"></i>填写实验报告</span>
		  	<div>
			  	<div class="list">{{capital[purpose.length]}}、实验思考</div>
			  	<div v-if="ponder.length > 0">
			  	<div v-for="(item,index) in ponder">
			  		<p>{{index+1}}、{{item.topic}}</p>
			  		<quill-editor ref="myTextEditor" v-model="content[index]">
	        		</quill-editor>
	        		<div class="btnsave"><el-button type="danger" @click="saveSubjective(index)">保存</el-button></div>
			  	</div>
			  	</div>
			  	<div v-else>
			  		<p style="text-indent: 2em">暂无思考题</p>
			  	</div>
		  	</div>
		  	<div>
		  		<div class="list">{{capital[purpose.length+1]}}、实验总结</div>
		  		<div>
		  			<p>1．实验总结 （总结本次实验收获，实验中应该注意的事项） </p>
			  		<quill-editor ref="myTextEditor" v-model="summary">
	        		</quill-editor>
	        		<div class="btnsave"><el-button type="danger" @click="saveSummary">保存</el-button></div>
		  		</div>
		  	</div>
		  </el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
	import {getStuQuestion,getExperimentContent,getExperimentConclusion,submitFinish} from '@/api/api';
	export default{
		name :"excontent",
		data(){
			return {
				activeName:'first',
				week:['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
				timer:'',//时间函数
				date:'',
				time:'',//实时时间
				starttime:'',//签到时间
				usetime:'',//完成时长
				timestamp:'',//实时时间戳
				startstamp:'',//签到时间戳
				endtime:'',//签退时间
				endstamp:'',//签退时间戳
				stopflag:false,//计时器停止
				content:[],//文档内容
				singleCount:0,//单选题分数
				multiCount:0,//多选题分数
				questions:[],//测试题
				stuselect:[],//学生选择
				testLoading:false,//loding
				purpose:[],//目的及意义
				ponder:[],//实验思考
				user:{},//用户信息
				summary:'',//实验总结
				isFinishtest:false,//判断是否交卷
				activeClass:'flagBlue',//正确
				errorClass:'flagRed',//错误
				activeBorder:'BorderBlue',//正确
				errorBorder:'BorderRed',//错误
				num:["A","B","C","D","E","F","G","H","I","J"],//字母
				capital:['一','二','三','四','五','六','七','八','九','十','十一','十二','十三']
			}
		},
		methods:{
			updateTime(){
				var cd = new Date();
				this.timestamp = Date.parse(cd);
				this.time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2);
    			this.date = this.zeroPadding(cd.getFullYear(), 4) + '-' + this.zeroPadding(cd.getMonth()+1, 2) + '-' + this.zeroPadding(cd.getDate(), 2) + ' '+this.week[cd.getDay()];
    			if(this.startstamp!='' && !this.stopflag){
    				var arr=this.calculateDiffTime(this.startstamp,this.timestamp);
    				this.usetime = this.zeroPadding(arr[0], 2) + ':' + this.zeroPadding(arr[1], 2) + ':' + this.zeroPadding(arr[2], 2);
    			}
			},
			handleCheckedCitiesChange(value){
				console.log(value);
				console.log(this.stuselect);
			},
			zeroPadding(num,digit){
				var zero = '';
			    for(var i = 0; i < digit; i++) {
			        zero += '0';
			    }
			    return (zero + num).slice(-digit);
			},
			start(){
				if(this.starttime==''){
					this.starttime = this.time;
					this.startstamp =this.timestamp;
					// console.log(this.startstamp);
				}else{
					this.$message({
			           message: '警告哦，您已经签到过了！',
			           type: 'warning'
			        });
				}
			},
			stop(){
				if(this.starttime!=''){
					if(this.endtime ==''){
						this.endtime = this.time;
						this.endstamp = this.timestamp;
						this.stopflag=true;
					}else{
						this.$message({
				           message: '警告！已经签退过了，如果是误点，请联系老师',
				           type: 'warning'
				        });
					}
				}else{
					this.$message({
			           message: '警告哦，您需要先进行签到！',
			           type: 'warning'
			        });
				}
			},
			calculateDiffTime(start_time,end_time) {
				var startTime = 0, endTime = 0
				if (start_time < end_time){
					startTime = start_time
					endTime = end_time
				}else{
					startTime = end_time
					endTime = start_time
				}
				var timeDiff = (endTime - startTime)/1000;
				var hour = Math.floor(timeDiff / 3600);
				timeDiff = timeDiff % 3600;
				var minute = Math.floor(timeDiff / 60);
				timeDiff = timeDiff % 60;
				var second = timeDiff;
				return [hour,minute,second];
			},
			//获取测试题
			getTestQuesetion(){
				let param = {
					stuid : this.user.id,
					exid : this.$route.params.id
				}
				this.testLoading = true;
				getStuQuestion(param).then(res => {
					// console.log(res.data.data);
					this.testLoading = false;
					if(res.data.code == 200){
						this.singleCount = res.data.data.singleCount;
						this.multiCount = res.data.data.multiCount;
						this.questions = res.data.data.questions;
						for(var i = 0; i<this.questions.length;i++){
							this.stuselect.push({
								exid:this.questions[i].exid,
								id:this.questions[i].id,
								select:[],
								correctSelect:this.questions[i].correctAnswer,
							})
							this.questions[i].correctArr = this.questions[i].correctAnswer.split(",").map(Number).sort();
							for(var j = 0 ;j<this.questions[i].soptions.length;j++){
								this.questions[i].soptions[j].isture = 0;
								for(var k = 0; k<this.questions[i].correctArr.length;k++){
									if(Number(this.questions[i].soptions[j].flag) == this.questions[i].correctArr[k]){
										this.questions[i].soptions[j].isture = 1;
									}
								}
							}
						}
						console.log(this.questions);
					}
				});
			},
			getExperimentS(){
				let param ={
					id:this.$route.params.id
				}
				getExperimentContent(param).then(res => {
					// console.log(res.data.data);
					this.purpose = res.data.data;
				});

			},
			//主观题
			getExperimentsConclusion(){
				let param = {
					exid:this.$route.params.id
				}
				getExperimentConclusion(param).then(res => {
					// console.log(res.data.data);
					this.ponder = res.data.data;
				})
			},
			//预测题交卷
			complete(){
				let falg = false;
				let score = 0;
				for(var i = 0 ;i<this.stuselect.length;i++){
					if(this.stuselect[i].select.length==0){
						falg = true;
					}
				}
				if(falg){
					this.$message.error('请先完成题目！');
					return false;
				}else{
					for(var i = 0 ;i<this.stuselect.length;i++){
						var solution = this.stuselect[i].correctSelect.split(",");
						// console.log(this.stuselect[i].select.length);
						if(typeof this.stuselect[i].select == 'number'){
							if(Number(solution[0]) == Number(this.stuselect[i].select)){
								score += Number(this.singleCount);
								this.questions[i].isture = 1;
							}else{
								this.questions[i].isture = 0;
							}
							var arr = [];
							arr.push(this.stuselect[i].select);
							this.questions[i].stuselect = arr;
						}else{
							var stuanswer = this.stuselect[i].select.sort().toString();
							var correctanswer = solution.sort().toString();
							if(stuanswer == correctanswer){
								score += Number(this.multiCount);
								this.questions[i].isture = 1;
							}else{
								this.questions[i].isture = 0;
							}
							this.questions[i].stuselect = this.stuselect[i].select.sort();
						}
					}
					this.isFinishtest = true;
					console.log(score);
					console.log(this.questions);
				}
			},
			//主观题交卷
			saveSubjective(index){
				if(typeof this.content[index] == 'undefined' || this.content[index] == ''){
					this.$message.error('请输入答案内容');
				}else{
					let param =Object.assign({},this.ponder[index]);
					param.content = this.content[index];
					param.stuid = this.user.id;
					console.log(param);
				}

			},
			//saveSummary实验总结
			saveSummary(){
				if(typeof this.summary == 'undefined' || this.summary == ''){
					this.$message.error('请输入答案内容');
				}else{
					let param = {
						exid:this.$route.params.id
					};
					param.content = this.summary;
					param.stuid = this.user.id;
					console.log(param);
				}
			}
		},
		mounted(){
			this.timer=setInterval(this.updateTime,1000);
			this.updateTime();
			var user = sessionStorage.getItem('user');
		    if (user) {
		        this.user = JSON.parse(user);
		    }
			this.getTestQuesetion();
			this.getExperimentS();
			this.getExperimentsConclusion();
		}
	}
</script>
<style scoped>
	.excontent{
		width: 97%;	
		margin:0 auto;
		margin-top: 50px;
		margin-bottom: 50px;
	}
	.test-select{
		width: 95%;
		margin:0 auto;
	}
	.test-header{
		height: 50px;
		line-height: 50px;
		font-size: 16px;
		color: #333;
	}
	.submit{
		margin-left: 45%;
		margin-top: 50px;
	}
	.sign p{
		margin: 20px;
	}
	.second_content{
		height: 500px;
		background: #0f3854;
  		background: -webkit-radial-gradient(center ellipse, #0a2e38 0%, #000000 70%);
  		background: radial-gradient(ellipse at center, #0a2e38 0%, #000000 70%);
  		background-size: 100%;
	}
	.sign{
  		font-family: 'Share Tech Mono', monospace;
  		color: #ffffff;
  		text-align: center;
  		position: absolute;
  		left: 50%;
  		top: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
  		color: #daf6ff;
  		text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0);
	}
	.time{
		letter-spacing: 0.05em;
  		font-size: 50px;
  		padding: 5px 0;
	}
	.date{
		letter-spacing: 0.1em;
  		font-size: 24px;
	}
	.list{
		height: 20px;
		line-height: 20px;
		background-color: #409EFF;
		display: inline-block;
		padding: 10px 15px;
		border-radius:25px;
		color: #fff;
	}
	.list_content{
		width: 95%;
		margin: 0 auto
	}
	.btnsave{
		height: 100%;
		text-align: right;
		margin-top: 10px;
	}
	.tagtitle{
		width: 150px;
		line-height: 50px;
		font-size: 20px;
		color: red;
		margin: 0 auto;
		padding-top: 200px;
	}
	.pselectdiv{
		width: 95%;
		margin: 0 auto;
	}
	.pselect{
		height: 40px;
		line-height: 40px;
		border: 1px solid #dcdfe6;
		border-radius: 4px;
		box-sizing: border-box;
		color: #606266;
		font-weight: 500;
		font-size: 14px;
		width: 70%;
		padding-left: 20px;
	}
	.pselectdiv span{
		font-size: 14px;
    	margin-bottom: 20px;
    	color: #666;
	}
	.flagRed{
		color: #ff6547!important;
	}
	.flagBlue{
		color: #25bb9b!important;
	}
	.BorderBlue{
		border-color: #25bb9b!important;
	}
	.BorderRed{
		border-color: #ff6547!important;
	}
</style>
<style type="text/css">
	.el-radio.is-bordered {
		width: 100%;
	}
	.el-radio+.el-radio{
		margin-left: 0px;
		margin-top: 20px;
	}
	.el-radio.is-bordered+.el-radio.is-bordered{
		margin-left: 0px;
	}
	.ql-container{
		height: 300px;
	}
	.el-radio-group{
		width: 70%;
	}
	.el-checkbox.is-bordered{
		width: 70%;
	}
	.el-checkbox.is-bordered+.el-checkbox.is-bordered{
		margin-left: 0px;
		margin-top: 20px;
	}
	/*.el-radio.is-bordered.is-checked{
		border-color: red;
	}
	.el-radio__input.is-checked+.el-radio__label{
		color: red;
	}
	.el-radio__input.is-checked .el-radio__inner{
		border-color: red;
  		background: red;
	}*/

</style>