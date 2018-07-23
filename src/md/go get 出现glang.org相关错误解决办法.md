## go get 出现 glang.org 相关错误解决办法

glang.org 在国内是被墙了的，所以相关依赖包不能直接下载。

解决办法：

在 github [golang](https://github.com/golang) 中有相关的镜像，我们只需要把我们需要的镜像下载到本地即可。

**镜像映射：https://golang.org/x/ => https://github.com/golang/**

1.  在本地$GOPATH 或者$GOROOT 的 src 目录下建立相关文件夹：src/golang.org/x
2.  在 x 目录下 gitclone 相关失败的 package
3.  再次执行`go get`即可

### 如果你使用包管理工具 glide 也可以通过设置 glide mirror set 解决。

### 貌似包管理工具 dep 会自动镜像 golang.org/x 的相关资源。
