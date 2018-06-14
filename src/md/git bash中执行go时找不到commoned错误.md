###解决办法：
https://stackoverflow.com/questions/36869660/git-shell-go-command-not-found

You have to put the Go executable in your PATH:

1) cd ~

2) vi .bashrc

3) Inside .bashrc, enter the following: PATH=$PATH:/c/Go/bin

Restart git bash and you should now have the go command
