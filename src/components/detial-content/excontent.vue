<template>
	<div class="excontent">
		<el-tabs type="border-card"  v-model="activeName">
		  <el-tab-pane name="first">
		    <span slot="label"><i class="el-icon-document"></i> 预习测试</span>
		    <div v-for="(item,index) in 3">
		    	<div class="test-header">
		    		{{item}}.<span style="color: red">[单选题]</span> 用于加亮文本代标签是
		    	</div>
		    	<div class="test-select">
		    		<el-radio v-model="radio[index]" label="1" border>备选项1</el-radio>
    				<el-radio v-model="radio[index]" label="2" border>备选项2</el-radio>
    				<el-radio v-model="radio[index]" label="3" border>备选项2</el-radio>
    				<el-radio v-model="radio[index]" label="4" border>备选项2</el-radio>
		    	</div>
		    </div>
		    <el-button type="danger" class="submit">交卷</el-button>
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
		  	<div class="third_content">
		  		<div class="">
		  			<div class="list">一、实验目的</div>
		  			<div class="list_content">
		  				<p>1.进一步熟悉Quartus II 的使用方法，掌握层次化设计方法设电路的方法。</p>
		  				<p>2.熟悉七人表决器的工作原理。</p>
		  			</div>
		  		</div>
		  		<div class="">
		  			<div class="list">二、实验原理</div>
		  			<div class="list_content">
		  				<p>七人表决器就是由七个人参加投票，当同意的票数大于或者等于4时，则投票结果为同意；反之，当否决的票数大于或者等于4时，则认为不同意。</p>
		  			</div>
		  		</div>
		  		<div class="">
		  			<div class="list">三、实验内容</div>
		  			<div class="list_content">
		  				<p>七人表决器的可选设计方案非常多，可以使用原理图来实现，也可以使用VHDL语言选择实现，本实验要求同学们使用层次化设计方法设计七人表决器电路（低层使用VHDL语言设计、顶层使用原理图实现）。</p>
		  			</div>
		  		</div>
		  		<div class="">
		  			<div class="list">四、预习要求</div>
		  			<div class="list_content">
		  				<p>1.预习七人表决器的工作原理，思考用多种方法实现。</p>
		  				<p>2.写出使用层次化设计方法设计七人表决器电路的设计方案以及实现的VHDL语言代码和原理图。</p>
		  			</div>
		  		</div>
		  		<div class="">
		  			<div class="list">五、实验步骤</div>
		  			<div class="list_content">
		  				<p>1.将设计的原理图或VHDL源代码输入到计算机中。</p>
		  				<p>2.写出管脚锁定的方案</p>
		  				<p>3.在实验仪上验证设计的结果</p>
		  			</div>
		  		</div>
		  	</div>
		  </el-tab-pane>
		  <el-tab-pane name="fourth">
		  	<span slot="label"><i class="el-icon-edit"></i>填写实验报告</span>
		  	<div>
			  	<div class="list">六、实验思考</div>
			  	<div v-for="(item,index) in 5">
			  		<p>1．请同学们思考，将表决结果中同意的人数，在二极管上显示出来，请修改你的设计。 </p>
			  		<quill-editor ref="myTextEditor" v-model="content[index]">
	        		</quill-editor>
	        		<div class="btnsave"><el-button type="danger">保存</el-button></div>
			  	</div>
		  	</div>
		  	<div>
		  		<div class="list">七、实验总结</div>
		  		<div>
		  			<p>1．实验总结 （总结本次实验收获，实验中应该注意的事项） </p>
			  		<quill-editor ref="myTextEditor">
	        		</quill-editor>
	        		<div class="btnsave"><el-button type="danger">保存</el-button></div>
		  		</div>
		  	</div>
		  </el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
	import {getStuQuestion} from '@/api/api';
	export default{
		name :"excontent",
		data(){
			return {
				activeName:'first',
				radio:[],
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
					stuid : 1,
					exid : this.$route.params.id
				}
				getStuQuestion(param).then(res => {
					console.log(res.data.data);
				});
			}
		},
		mounted(){
			this.timer=setInterval(this.updateTime,1000);
			this.updateTime();
			this.getTestQuesetion();
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
</style>
<style type="text/css">
	.el-radio.is-bordered{
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
</style>