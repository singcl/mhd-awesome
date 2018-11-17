git 如何撤销修改：https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/001374831943254ee90db11b13d4ba9a73b9047f4fb968d000

git reset soft,hard,mixed 之区别深解：https://www.cnblogs.com/kidsitcn/p/4513297.html

###

#### 1. git 工作区修改还没有 add 到暂存区（stage）

命令：`git checkout -- file` 可能丢弃掉工作区的修改，保持和最近一次提交的内容一致 （当然，如果你愿意，你也可以手动还原修改的内容）

#### 2. git 工作区修改已经 add 到了暂存区（stage）

命令：`git add file` 将工作区的修改 add 到暂存区
逆命令：`git reset HEAD file` 可以将 file 从暂存区撤销到工作区，这样我们就可以重新编辑

命令：`git commit -m 'message'` 将暂存区的内容提交到本地仓库
逆命令（软版本回退）： `git reset --soft HEAD^` 将本地仓库回退到上一个版本，同时保留修改的内容到暂存区
硬版本回退：`git reset --hard HEAD^` 将本地仓库回退到上一个版本，同时删除所有修改内容

#### 3. git 批量删除本地分支

使用 git 时候，经常会发现，不知不觉就创建了大量的分支。那么，麻烦事就来了，如此多废弃的分支，该怎么办呢？
总不能一个一个执行 `git branch -D branchName` 删除吧！
下面提供一种批量删除分支的方法:

```shell
git branch |grep 'branchName' |xargs git branch -D
```

这是通过 shell 管道命令来实现的批量删除分支的功能

git branch 输出当前分支列表

grep 是对 git branch 的输出结果进行匹配，匹配值当然就是 branchName

xargs 的作用是将参数列表转换成小块分段传递给其他命令

因此，这条命令的意思就是:

```shell
从分支列表中匹配到指定分支，然后一个一个(分成小块)传递给删除分支的命令，最后进行删除。
```

_注：. 可以表示所有文件_
