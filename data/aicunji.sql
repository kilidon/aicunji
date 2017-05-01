SET NAMES UTF8;
DROP DATABASE IF EXISTS aicunji;
CREATE DATABASE aicunji CHARSET=UTF8;
USE aicunji;

/*用户表*/
CREATE TABLE user_login(
    userId INT PRIMARY KEY AUTO_INCREMENT,
    phone VARCHAR(11),
    upwd VARCHAR(32)
);
INSERT INTO user_login VALUE
(NULL,'13016492220','000000');

/*用户本月收入支出表*/
CREATE TABLE user_fund(
    userId INT PRIMARY KEY,
    pay FLOAT(12,2),
    addbud FLOAT(12,2)
);
INSERT INTO user_fund VALUE
(1,8666.45,2000);
