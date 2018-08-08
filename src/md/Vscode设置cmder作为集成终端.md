## VSCODE 设置CMDER作为集成终端

```sh
# vscode 设置 cmder为终端
"terminal.integrated.shell.windows": "cmd.exe",
"terminal.integrated.shellArgs.windows": ["/k", "C:\\Program Files\\cmder\\vendor\\init.bat"],
```
## PyCharm设置
settings -> tools -> terminal

```sh
"cmd.exe" /k ""%CMDER_ROOT%\vendor\init.bat""
```
