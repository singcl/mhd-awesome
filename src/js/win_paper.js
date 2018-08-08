/**
 * @description 获取win10壁纸js版
 * @author singcl <https://github.com/singcl/>
 * @version 0.0.1
 * @since 0.0.1
 */

var fs = require('fs');

// win10上壁纸原始目录
var originWallpaperFolder =
    process.env.LOCALAPPDATA +
    '\\Packages\\Microsoft.Windows.ContentDeliveryManager_cw5n1h2txyewy\\LocalState\\Assets';

// 我们即将保存的目录 - 支持多级目录
var paperFolder = './win/wallpaper/xx/xxx/xx';

// 同步创建dest目录 - 支持创建多级目录
// 如果目录存在则不做处理，不存在则创建
createPathSync(paperFolder);

// fs.exists 已废弃的接口，推荐使用 fs.access() 代替 fs.exists()。
// @link http://nodejs.cn/api/fs.html#fs_fs_exists_path_callback
// 直接读取目录, 根据错误信息判断目录是否存在
fs.readdir(originWallpaperFolder, function(err, files) {
    if (err) {
        console.error(err);
        return;
    }

    const fileNames = files.map((item) => `${originWallpaperFolder}\\${item}`);
    console.log(fileNames);
    fileNames.forEach((item, index) => {
        const stat = fs.statSync(item);
        if (stat.size / 1024 > 150) {
            fs.copyFile(item, `${paperFolder}/${files[index]}.jpg`, function(
                err
            ) {
                if (err) console.log(err);
            });
        }
    });
});

// 由于fs.mkdir 只能一级一级的创建目录
// 所以这里写一个方法可以一次创建多级目录
function createPathSync(foldPath) {
    const pathArr = foldPath.split('/');
    let _path = '';
    for (let i = 0; i < pathArr.length; i++) {
        if (pathArr[i]) {
            _path += `${pathArr[i]}/`;
            try {
                fs.accessSync(_path);
            } catch (e) {
                if (e.code === 'ENOENT') {
                    fs.mkdirSync(_path);
                } else {
                    console.log(e);
                }
            }
        }
    }
}
