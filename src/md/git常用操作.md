git如何撤销修改：https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/001374831943254ee90db11b13d4ba9a73b9047f4fb968d000

git reset soft,hard,mixed之区别深解：https://www.cnblogs.com/kidsitcn/p/4513297.html

### 
#### 1. git工作区修改还没有add到暂存区（stage）
命令：`git checkout -- file` 可能丢弃掉工作区的修改，保持和最近一次提交的内容一致 （当然，如果你愿意，你也可以手动还原修改的内容）

#### 2. git 工作区修改已经add到了暂存区（stage）
命令：`git add file` 将工作区的修改add到暂存区
逆命令：`git reset HEAD file` 可以将file从暂存区撤销到工作区，这样我们就可以重新编辑

命令：`git commit -m 'message'` 将暂存区的内容提交到本地仓库
逆命令（软版本回退）： `git reset --soft HEAD^` 将本地仓库回退到上一个版本，同时保留修改的内容到暂存区 
硬版本回退：`git reset --hard HEAD^` 将本地仓库回退到上一个版本，同时删除所有修改内容

*注：. 可以表示所有文件*
