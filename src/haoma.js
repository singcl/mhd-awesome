/**
 * 简单的抓取号码归属网站http://www.jihaoba.com/haoduan/139/jiaxing.htm的电话号码
 * 然后下载为本地excel(.xls)文件
 * 如果mocrosoft execl打不开的话或者总是错误提示请用wps打开
 * @authors singcl (24661881@qq.com)
 * @date    2018-07-17 18:16:03
 * @version v0.0.1
 */

var lis = document.getElementsByClassName("hd-city")[1].children;
var number = [];
var provence = [];
var city = [];
var quhao = [];
var yunshang = [];

for (var i = 0; i < lis.length; i++) {
    switch (lis[i].className) {
        case "hd-city01":
            number.push(lis[i].children[0].innerHTML);
            break;
        case "hd-city02":
            provence.push(lis[i].innerText);
            break;
        case "hd-city03":
            city.push(lis[i].innerText);
            break;
        case "hd-city04":
            quhao.push(lis[i].innerText);
            break;
        case "hd-city06":
            yunshang.push(lis[i].innerText);
            break;
        default:
            break;
    }

    //      console.log(lis[i])
}

var len = number.length;
var table = [];
for (var i = 0; i < len; i++) {
    table.push(`<tr>
        <td>${number[i]}</td>
        <td>${provence[i]}</td>
        <td>${city[i]}</td>
        <td>${quhao[i]}</td>
        <td>${yunshang[i]}</td>
    </tr>`);
}

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
        <table>
            <tr>
              <th>号码段</th>
              <th>省份</th>
              <th>城市</th>
              <th>区号</th>
              <th>运营商</th>
            </tr>
            ${table.join("\n")}
        </table>
    </body>
    </html>
`;

var blobExcel = new Blob([html], {
    type: "application/vnd.ms-excel"
});

var oA = document.createElement("a");
oA.href = URL.createObjectURL(blobExcel);
oA.download = "haoma.xls";
oA.click();

// console.log(number,provence, city, quhao, yunshang)
