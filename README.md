# Day 1
1.yarn和npm区别
yarn速度快
    并行安装：
        无论 npm 还是 Yarn 在执行包的安装时，都会执行一系列任务。npm 是按照队列执行每个 package，也就是说必须要等到当前 package 安装完成之后，才能继续后面的安装。
        而 Yarn 是同步执行所有任务，提高了性能。
    离线模式：
        如果之前已经安装过一个软件包，用Yarn再次安装时之间从缓存中获取，就不用像npm那样再从网络下载了。


2.如何手动创建react+next的项目：
yarn add react react-dom next

3.如何通过脚手架创建react+next项目：
npm install -g create-next-app
npx create-next-app projectname
或者
yarn create next-app projectname