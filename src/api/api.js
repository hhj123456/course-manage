import axios from 'axios';
const Qs = require('qs');

// let base = 'https://dgerbu6e.qcloud.la/weapp';
// let base = 'http://111.230.237.84/weapp/index.php?';
//登录接口
export const requestLogin = params => { 
	return axios.post(
		`api/login/index`,
		Qs.stringify(params),
		{
	        headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	        }
      	}
    ); 
};
