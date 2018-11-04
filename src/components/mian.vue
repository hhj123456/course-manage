<template>
	<el-container style="min-width: 1137px;">
	  	<el-header style="height: 70px">
	  		<exheader></exheader>
	  	</el-header>
	   <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
	    <exfooter></exfooter>
	</el-container>
</template>

<script type="text/javascript">
  import exfooter from './footer/footer.vue';
  import exheader from './header/header.vue';
	export default {
		name:"excmain",
    	components:{
	      	exfooter,
	      	exheader
	    },
		data(){
			return {
			 
			}
		}
	}
</script>
