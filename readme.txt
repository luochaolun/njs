进入目录

安装nodejs

curl -sL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo dnf install -y nodejs
node -v
---------------------------------------------------------------
CentOS8用pm2配置nodejs程序自启 https://blog.csdn.net/weixin_35958891/article/details/105800083

npm install pm2 -g
pm2 start /var/www/html/njs/index.js
pm2 save
pm2 startup
systemctl enable pm2-root