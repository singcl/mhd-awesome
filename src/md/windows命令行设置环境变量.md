# Windows通过命令行设置环境变量

## 设置临时变量，临时变量只在当前会话有效

命令： `set`

```sh
# 查看变量DENO_HOME
set DENO_HOME
# 设置临时变量DENO_HOME
set DENO_HOME "D:\deno"

```

## 使用命令`setx`

用于设置用户环境变量和系统环境变量。默认设置是用户环境变量，通过选项`/m`设置系统环境变量。

键入 `SETX /?` 以了解用法。

命令： `setx`

### 设置用户环境变量

```sh
# 查看变量DENO_HOME
setx DENO_HOME
# 设用户变量DENO_HOME
setx DENO_HOME "D:\deno"

```

### 设置系统环境变量

```sh
# 查看变量DENO_HOME
setx DENO_HOME
# 设用户变量DENO_HOME
setx /m DENO_HOME "D:\deno"

```

### 追加到PATH变量
```sh
# 追加DENO_HOME到path变量中
setx /m PATH "%PATH%;%DENO_HOME%\bin;"
```

注：上面 setx 命令后面用引号可以去除空格的影响，不加引号，会出现如下错误：

错误：无效语法。默认选项不允许超过 '2' 次。
