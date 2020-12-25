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


TODO: 1. 整理一下 component，把常用的抽出來，還有把 comppnent 改成有 editable 的參數，把 component 的一些限制拿出來，讓 pages 裡面控制，基本的放到 component 裡面
TODO: 2. 在 event State 新增依照 event 狀態判斷能不能改，在想要另外設一個 state editable 還是？
TODO: 3. 新增 saved 的 state