/*
Navicat MySQL Data Transfer

Source Server         : 本地连接
Source Server Version : 50620
Source Host           : localhost:3306
Source Database       : recruitmentdb

Target Server Type    : MYSQL
Target Server Version : 50620
File Encoding         : 65001

Date: 2019-06-11 10:58:47
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '管理员编号',
  `name` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '管理员名称',
  `pwd` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '管理员密码',
  `power` int(11) NOT NULL DEFAULT '0' COMMENT '管理员权限',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', 'admin', 'YWRtaW4=', '0');
INSERT INTO `admin` VALUES ('2', '张三', 'MTIzNDU2', '1');

-- ----------------------------
-- Table structure for jobs
-- ----------------------------
DROP TABLE IF EXISTS `jobs`;
CREATE TABLE `jobs` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '岗位编号',
  `title` varchar(255) NOT NULL COMMENT '岗位名称',
  `description` text NOT NULL COMMENT '岗位描述',
  `num` int(11) NOT NULL COMMENT '岗位需求人数',
  `note` text COMMENT '岗位标签',
  `site` varchar(255) NOT NULL COMMENT '工作地点',
  `pay` varchar(255) NOT NULL COMMENT '报酬',
  `exp` varchar(255) NOT NULL COMMENT '工作经验',
  `edu` varchar(255) NOT NULL COMMENT '学历要求',
  `phone` varchar(255) NOT NULL COMMENT '联系电话',
  `email` varchar(255) NOT NULL COMMENT '联系邮箱',
  `state` int(11) NOT NULL DEFAULT '0' COMMENT '岗位状态',
  `time` varchar(255) NOT NULL COMMENT '发布日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of jobs
-- ----------------------------
INSERT INTO `jobs` VALUES ('1', '测试', '测试', '120', '五险一金', '福州', '1220', '无经验', '博士', '17805982334', 'winn_huang@163.com', '0', '2019-4-11');

-- ----------------------------
-- Table structure for resumes
-- ----------------------------
DROP TABLE IF EXISTS `resumes`;
CREATE TABLE `resumes` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '简历编号',
  `user` int(11) DEFAULT NULL COMMENT '简历持有人',
  `title` varchar(255) NOT NULL COMMENT '简历标题',
  `name` varchar(255) NOT NULL COMMENT '姓名',
  `sex` varchar(255) NOT NULL COMMENT '性别',
  `date` varchar(255) NOT NULL COMMENT '出生日期',
  `age` int(11) NOT NULL COMMENT '年龄',
  `nation` varchar(255) NOT NULL COMMENT '民族',
  `birthplace` varchar(255) NOT NULL COMMENT '籍贯',
  `politics` varchar(255) NOT NULL COMMENT '政治面貌',
  `marriage` varchar(255) NOT NULL COMMENT '婚姻状态',
  `phone` varchar(255) NOT NULL COMMENT '手机号',
  `email` varchar(255) NOT NULL COMMENT '邮箱',
  `site` varchar(255) NOT NULL COMMENT '所在地区',
  `img` text NOT NULL COMMENT '个人头像',
  `exp` varchar(255) NOT NULL COMMENT '工作经验',
  `expdetail` text COMMENT '工作经验详情',
  `edu` varchar(255) NOT NULL COMMENT '学历',
  `edudetail` text COMMENT '教育经历详情',
  `project` text COMMENT '项目经验',
  `school` text COMMENT '在校情况',
  `other` text COMMENT '附加信息',
  PRIMARY KEY (`id`),
  KEY `re_user` (`user`),
  CONSTRAINT `re_user` FOREIGN KEY (`user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of resumes
-- ----------------------------
INSERT INTO `resumes` VALUES ('1', '1', 'win', 'aaaa', '男', '2011-06-02', '7', 'aaa', 'aa', '中共党员', '未婚', '17805982334', 'winn_huag@163.com', 'aaa', '男孩头像.png', '3-5年', '', '博士', '', '', '', '');

-- ----------------------------
-- Table structure for sends
-- ----------------------------
DROP TABLE IF EXISTS `sends`;
CREATE TABLE `sends` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '投递编号',
  `user` int(11) DEFAULT NULL COMMENT '用户编号',
  `job` int(11) DEFAULT NULL COMMENT '岗位编号',
  `resume` int(11) DEFAULT NULL COMMENT '简历编号',
  `state` int(11) NOT NULL DEFAULT '0' COMMENT '状态',
  PRIMARY KEY (`id`),
  KEY `send_user` (`user`),
  KEY `send_job` (`job`),
  KEY `send_re` (`resume`),
  CONSTRAINT `send_job` FOREIGN KEY (`job`) REFERENCES `jobs` (`id`),
  CONSTRAINT `send_re` FOREIGN KEY (`resume`) REFERENCES `resumes` (`id`),
  CONSTRAINT `send_user` FOREIGN KEY (`user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sends
-- ----------------------------
INSERT INTO `sends` VALUES ('1', '1', '1', '1', '2');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户编号',
  `phone` varchar(255) NOT NULL COMMENT '用户手机号',
  `pwd` varchar(255) NOT NULL COMMENT '用户密码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', '17805982334', 'MTIzNDU2');
