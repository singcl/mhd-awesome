/**
 * 导出QQ群所有成员 excel
 * @authors singcl (24661881@qq.com)
 * @date    2018-10-25 23:45
 * @version v0.0.1
 */

var membersTab = document.getElementById("groupMember")

var html = `
    <html>
    <head>
        <meta charset='utf-8' />
        <style>
            th,td {
                text-align: center;
                width: auto;
            }
        </style>
    </head>
    <body>
        ${membersTab.outerHTML}
    </body>
    </html>
`

// console.log(html)

var blobExcel = new Blob([html], {
    type: "application/vnd.ms-excel"
})

var oA = document.createElement("a")
oA.href = URL.createObjectURL(blobExcel)
oA.download = "memebers.xls"
oA.click()
