import axios from 'axios';
const Qs = require('qs');

let base = 'api';
export let baseImge = "http://111.230.237.84/exserver/";//图片读取地址
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
