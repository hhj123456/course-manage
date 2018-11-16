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
