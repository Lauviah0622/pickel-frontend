"ok": true,
"data": {
"event": {
"id": 4,
"pickStart": "2020-12-12T15:12:38.000Z",
"pickEnd": "2020-12-14T15:12:38.000Z",
"name": "determined",
"description": "picking time: start before 3 day, expired yesterday\n duration: 1.5hr\n Range: after 5 ~ 7 days 13:00 ~ 18:00\n picks: 4\n ",
"duration": 6,
"launcher": "Tom",
"eventType": "part",
"eventSuffix": "determined",
"pickSuffix": "determined",
"determineTime": "2020-12-20T06:12:38.000Z",
"ranges": [
{
"start": "2020-12-20T05:12:38.000Z",
"end": "2020-12-20T10:12:38.000Z"
},
{
"start": "2020-12-21T05:12:38.000Z",
"end": "2020-12-21T10:12:38.000Z"
},
{
"start": "2020-12-22T05:12:38.000Z",
"end": "2020-12-22T10:12:38.000Z"
}
]
},
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwic3RhdHVzIjoibGF1bmNoZXIiLCJleHAiOjE2MDgyNzA5NzEsImlhdCI6MTYwODI2NzM3MX0.aGgWzX3RRCfLIrxmcr4COxNclcuJrbQVKONMgT5RDsw"
}
}

TODO(DONE): 把 component 的一些限制拿出來，讓 pages 裡面控制，基本的放到 component 裡面。

目前正在重構 event 還有下面的 component，不同的 event state 對應到不同的 component。

TODO(DONE): （CURRENT 5%）因為在改 event 的時候有改 component 的 props 名稱，所以 create 那邊也要改

BUG(DONE): 新增預計舉辦範圍要有阻擋機制，如果不符合就不能新增，還有要處理 error message 的問題

TODO(DONE): CREATE 串上 建立 event 的 API

BUG(DONE): CREATE 如果沒有預計舉辦時間範圍，不給建立

TODO: - 建立成功後， 1. 給予 MODAL 告訴網址 2. 跳轉到 活動設定頁面 - 建立失敗的話 1. 錯誤頁面

TODO: 存檔 & 送出 event

1. 新增內容檢查，並且把檢查的結果放在 state 裡面(這個有點不知道要坐在哪裡)
2. 新增 存檔的 redux state，暗存檔才可以進行下一個動作，存檔會把資料傳到後端去，應該可以串後端的 update API

TODO: 記得 huli 提過得時間問題，後端時間的儲存方式還有前端儲存在 state 裡面的東西應該要統一成一個格式（我記得是 UTC 然後帶時區）

TODO: 投票狀況的 component
TODO: 設定活定開始時間的 component

TODO: 改後端 seuqelize migration 的名稱 改成

TODO: 修改 useEventStateProps 這個 function，讓它一次可以獲取多的參數，然後拿到多個 state 跟 setter
TODO: **加上 prop-types**
TODO: 2. 在 event State 新增依照 event 狀態判斷能不能改，在想要另外設一個 state editable 還是？
TODO: 3. 新增 saved 的 state

TODO: ！！！！！！先做這個！！！！設定說每個進去調整使用者身份的 state

TODO:個完整個 CI/CD 流程
