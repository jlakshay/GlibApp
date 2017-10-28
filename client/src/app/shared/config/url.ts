const port='4000';
const localhost='http://localhost:'+port;
export default{
	
	"register":localhost+'/registerUser',
	"mailotpSend":localhost+'/otpVerify/sendOTP',
	"mailotpVerify":localhost+'/otpVerify/verifyOTP',
	"getUserInfo":localhost+'/getUserInfo/',
	"getUserInfoPhoto":localhost+'/getUserInfo/photo/'
	
	
}
