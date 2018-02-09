
### CURL POST请求在不同平台（或者命令行工具）正确的提交格式
```shell
CMDER CURL POST请求格式: curl -H "Content-type:application/json" -X POST -d "{\"messag\": \"123456\"}" http://192.168.1.15:1200/api/loans/mix-loan/submit-loans
GIT BASH POST请求格式:   curl -H "Content-type:application/json" -X POST -d '{"message":"123456"}' http://192.168.1.15:1200/api/loans/mix-loan/submit-loans
```
### How to handle bodyParser.json() errors
https://github.com/expressjs/body-parser/issues/244
