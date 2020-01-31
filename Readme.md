# Demo 

https://nodejs-online-compiler.appspot.com

# 如何使用線上編譯 api

## 前置要求
請先註冊會員並且申請 api key

## url
將參數 post 到 https://nodejs-online-compiler.appspot.com/compile
## 參數(放在 body)

| 參數名稱 | 可用參數|
| -------- | -------- |
| userId     | (在此放入 userID)  |
| apiKey     | (在此放入 apiKey)  |
| language     | c,cpp,java,python,javascript  |
| script     | （在此放入程式碼）  |
| stdin     | （在此放入輸入）  |


<hr/>

## 範例

### 輸入：
```json=
{
    "userId":"[your user id]",
    "apiKey":"[your api key]",
	"language":"python",
	"script":"n = input();print(n)",
	"stdin":"123"
}
```
### 輸出：
``` json
{
    "stderr": "",
    "stdout": "123\n",
    "exitCode": 0,
    "memoryUsage": 319488,
    "cpuUsage": 7804
}
```