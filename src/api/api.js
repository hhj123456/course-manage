import axios from 'axios';
const Qs = require('qs');

let base = 'api';//本地
// let base ='http://47.101.167.187/exserver/index.php?';//线上
export let baseImge = "http://47.101.167.187/exserver/";//图片读取地址
//登录接口
export const requestLogin = params => { 
	return axios.post(
		`${base}/login/index`,
		Qs.stringify(params),
		{
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        }
      	}
    ); 
};

//获取课程接口
export const getCourse = params => { 
	return axios.post(
		`${base}/Addcourse/select`,
		Qs.stringify(params),
		{
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        }
      	}
    ); 
};

//获取实验章节
export const getChpaterExcement = params => { 
	return axios.post(
		`${base}/Addchapter/select`,
		Qs.stringify(params),
		{
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        }
      	}
    ); 
};

//获取测试题
export const getStuQuestion = params => { 
	return axios.post(
		`${base}/StuQues/index`,
		Qs.stringify(params),
		{
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        }
      	}
    ); 
};

//获取实验中的内容
export const getExperimentContent = params => { 
    return axios.post(
        `${base}/Addexreport/search`,
        Qs.stringify(params),
        {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    ); 
};

//获取实验与总结中的主观题
export const getExperimentConclusion = params => { 
    return axios.post(
        `${base}/Exconclusion/search`,
        Qs.stringify(params),
        {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    ); 
};

//交卷
export const submitFinish = params => { 
    return axios.post(
        `${base}/StuQues/submit`,
        Qs.stringify(params),
        {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    ); 
};

//签到
export const Signin = params => { 
    return axios.post(
        `${base}/kaoqin/index`,
        Qs.stringify(params),
        {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    ); 
};

//开始签到
export const SigninStart = params => { 
    return axios.post(
        `${base}/kaoqin/Getstime`,
        Qs.stringify(params),
        {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    ); 
};

//签退
export const SigninOut = params => { 
    return axios.post(
        `${base}/kaoqin/Getetime`,
        Qs.stringify(params),
        {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    ); 
};

//提交实验报告
export const submitExreport = params => { 
    return axios.post(
        `${base}/Exreport/index`,
        Qs.stringify(params),
        {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    ); 
};

//获取学生提交的
export const getStuExreport = params => { 
    return axios.post(
        `${base}/Exreport/select`,
        Qs.stringify(params),
        {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    ); 
};

//获取学生已经签到的
export const getStuRecord = params => { 
    return axios.post(
        `${base}/StuExp/index`,
        Qs.stringify(params),
        {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    ); 
};

//获取学生报告
export const getStuExreportAll = params => { 
    return axios.post(
        `${base}/Expinfo/index`,
        Qs.stringify(params),
        {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    ); 
};
