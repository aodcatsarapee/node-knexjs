/*
Navicat MySQL Data Transfer

Source Server         : accesscontrol
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : accesscontrol

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2020-06-04 10:59:18
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for group_menu
-- ----------------------------
DROP TABLE IF EXISTS `group_menu`;
CREATE TABLE `group_menu` (
  `group_menu_id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `group_menu_name` varchar(100) DEFAULT NULL,
  `group_menu_icon` varchar(50) DEFAULT NULL,
  `group_menu_sort` tinyint(3) unsigned DEFAULT NULL,
  `group_menu_create` datetime DEFAULT NULL,
  `group_menu_update` datetime DEFAULT NULL,
  PRIMARY KEY (`group_menu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of group_menu
-- ----------------------------
INSERT INTO `group_menu` VALUES ('7', 'คลังสินค้า', 'fa fa-cog', '1', null, '2018-06-17 17:22:51');
INSERT INTO `group_menu` VALUES ('8', 'ควบคุมระบบ', 'fa fa-cogs', '2', null, '2018-05-31 11:05:54');
INSERT INTO `group_menu` VALUES ('9', 'ประวัติการใช้งาน', 'fa fa-list', '3', null, '2018-05-31 11:05:54');
INSERT INTO `group_menu` VALUES ('12', 'test1', 'fa fa-home1', '6', '2020-06-04 10:56:15', '2020-06-04 10:56:38');

-- ----------------------------
-- Table structure for log_user_login
-- ----------------------------
DROP TABLE IF EXISTS `log_user_login`;
CREATE TABLE `log_user_login` (
  `log_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned DEFAULT NULL,
  `log_text` varchar(255) DEFAULT NULL,
  `log_ip_address` varchar(255) DEFAULT NULL,
  `log_browser` varchar(255) DEFAULT NULL,
  `log_time` datetime DEFAULT NULL,
  PRIMARY KEY (`log_id`),
  KEY `fk_log_user_login_user1_idx` (`user_id`),
  CONSTRAINT `log_user_login_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=130 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of log_user_login
-- ----------------------------
INSERT INTO `log_user_login` VALUES ('92', null, 'Logout', '::1', 'Chrome/67.0.3396.87 Windows 10 ', '2018-06-17 16:27:48');
INSERT INTO `log_user_login` VALUES ('93', null, 'Login', '::1', 'Chrome/67.0.3396.87 Windows 10 ', '2018-06-17 16:28:48');
INSERT INTO `log_user_login` VALUES ('94', null, 'Login', '::1', 'Chrome/67.0.3396.87 Windows 10 ', '2018-06-17 16:29:27');
INSERT INTO `log_user_login` VALUES ('95', null, 'Logout', '::1', 'Chrome/67.0.3396.87 Windows 10 ', '2018-06-17 16:39:59');
INSERT INTO `log_user_login` VALUES ('96', null, 'Login', '::1', 'Chrome/67.0.3396.87 Windows 10 ', '2018-06-17 16:40:05');
INSERT INTO `log_user_login` VALUES ('97', null, 'Logout', '::1', 'Chrome/67.0.3396.87 Windows 10 ', '2018-06-17 16:41:15');
INSERT INTO `log_user_login` VALUES ('98', null, 'Login', '::1', 'Chrome/67.0.3396.87 Windows 10 ', '2018-06-17 16:41:26');
INSERT INTO `log_user_login` VALUES ('99', null, 'Logout', '::1', 'Chrome/67.0.3396.87 Windows 10 ', '2018-06-17 17:11:22');
INSERT INTO `log_user_login` VALUES ('100', null, 'Login', '::1', 'Chrome/67.0.3396.87 Windows 10 ', '2018-06-17 17:11:31');
INSERT INTO `log_user_login` VALUES ('101', null, 'Logout', '::1', 'Chrome/67.0.3396.87 Windows 10 ', '2018-06-17 17:13:40');
INSERT INTO `log_user_login` VALUES ('102', null, 'Login', '::1', 'Chrome/67.0.3396.87 Windows 10 ', '2018-06-17 17:13:46');
INSERT INTO `log_user_login` VALUES ('103', null, 'Logout', '::1', 'Chrome/67.0.3396.87 Windows 10 ', '2018-06-17 17:14:26');
INSERT INTO `log_user_login` VALUES ('104', null, 'Login', '::1', 'Chrome/67.0.3396.87 Windows 10 ', '2018-06-17 17:14:39');
INSERT INTO `log_user_login` VALUES ('105', null, 'Logout', '::1', 'Chrome/67.0.3396.87 Windows 10 ', '2018-06-17 17:14:59');
INSERT INTO `log_user_login` VALUES ('106', null, 'Login', '::1', 'Chrome/67.0.3396.87 Windows 10 ', '2018-06-17 17:15:03');
INSERT INTO `log_user_login` VALUES ('107', null, 'Logout', '::1', 'Chrome/67.0.3396.87 Windows 10 ', '2018-06-17 17:15:49');
INSERT INTO `log_user_login` VALUES ('108', null, 'Login', '::1', 'Chrome/67.0.3396.87 Windows 10 ', '2018-06-17 17:18:01');
INSERT INTO `log_user_login` VALUES ('109', null, 'Login', '::1', 'Chrome/67.0.3396.99 Windows 10 ', '2018-07-08 15:43:18');
INSERT INTO `log_user_login` VALUES ('110', null, 'Login', '::1', 'Chrome/67.0.3396.99 Windows 10 ', '2018-07-20 20:24:02');
INSERT INTO `log_user_login` VALUES ('111', null, 'Login', '::1', 'Chrome/69.0.3497.100 Windows 10 ', '2018-09-23 16:54:09');
INSERT INTO `log_user_login` VALUES ('112', null, 'Login', '::1', 'Chrome/69.0.3497.100 Windows 10 ', '2018-09-24 20:13:50');
INSERT INTO `log_user_login` VALUES ('113', null, 'Login', '::1', 'Chrome/69.0.3497.100 Windows 10 ', '2018-09-24 23:08:34');
INSERT INTO `log_user_login` VALUES ('114', null, 'Login', '::1', 'Chrome/69.0.3497.100 Windows 10 ', '2018-10-11 21:05:43');
INSERT INTO `log_user_login` VALUES ('115', null, 'Login', '::1', 'Chrome/74.0.3729.131 Windows 10 ', '2019-05-12 08:21:46');
INSERT INTO `log_user_login` VALUES ('116', null, 'Login', '::1', 'Chrome/77.0.3865.120 Windows 10 ', '2019-10-17 22:00:14');
INSERT INTO `log_user_login` VALUES ('117', null, 'Login', '::1', 'Chrome/77.0.3865.120 Windows 10 ', '2019-10-24 13:46:13');
INSERT INTO `log_user_login` VALUES ('118', null, 'Logout', '::1', 'Chrome/77.0.3865.120 Windows 10 ', '2019-10-24 13:50:16');
INSERT INTO `log_user_login` VALUES ('119', null, 'Login', '::1', 'Chrome/77.0.3865.120 Windows 10 ', '2019-10-24 13:50:33');
INSERT INTO `log_user_login` VALUES ('120', null, 'Login', '::1', 'Chrome/78.0.3904.70 Windows 10 ', '2019-11-01 17:35:27');
INSERT INTO `log_user_login` VALUES ('121', null, 'Login', '::1', 'Chrome/78.0.3904.70 Windows 10 ', '2019-11-02 16:23:57');
INSERT INTO `log_user_login` VALUES ('122', null, 'Login', '::1', 'Chrome/78.0.3904.70 Windows 10 ', '2019-11-03 13:16:18');
INSERT INTO `log_user_login` VALUES ('123', null, 'Login', '::1', 'Chrome/78.0.3904.70 Windows 10 ', '2019-11-03 14:33:54');
INSERT INTO `log_user_login` VALUES ('124', null, 'Login', '::1', 'Chrome/78.0.3904.70 Windows 10 ', '2019-11-03 19:28:07');
INSERT INTO `log_user_login` VALUES ('125', null, 'Logout', '::1', 'Chrome/78.0.3904.70 Windows 10 ', '2019-11-03 20:21:40');
INSERT INTO `log_user_login` VALUES ('126', null, 'Login', '::1', 'Chrome/78.0.3904.70 Windows 10 ', '2019-11-03 20:49:20');
INSERT INTO `log_user_login` VALUES ('127', null, 'Login', '::1', 'Chrome/78.0.3904.70 Windows 10 ', '2019-11-05 16:40:40');
INSERT INTO `log_user_login` VALUES ('128', null, 'Login', '::1', 'Chrome/78.0.3904.70 Windows 10 ', '2019-11-05 20:20:26');
INSERT INTO `log_user_login` VALUES ('129', null, 'Login', '::1', 'Chrome/78.0.3904.87 Windows 10 ', '2019-11-07 14:47:23');

-- ----------------------------
-- Table structure for map_menu_role
-- ----------------------------
DROP TABLE IF EXISTS `map_menu_role`;
CREATE TABLE `map_menu_role` (
  `map_role_menu_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `menu_id` int(10) unsigned NOT NULL,
  `role_id` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`map_role_menu_id`),
  KEY `fk_map_role_menu_menu1_idx` (`menu_id`),
  KEY `fk_map_role_menu_role1_idx` (`role_id`),
  CONSTRAINT `map_menu_role_ibfk_1` FOREIGN KEY (`menu_id`) REFERENCES `menu` (`menu_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `map_menu_role_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=167 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of map_menu_role
-- ----------------------------
INSERT INTO `map_menu_role` VALUES ('152', '24', '1');
INSERT INTO `map_menu_role` VALUES ('157', '23', '2');
INSERT INTO `map_menu_role` VALUES ('159', '32', '2');
INSERT INTO `map_menu_role` VALUES ('163', '25', '1');
INSERT INTO `map_menu_role` VALUES ('165', '32', '1');
INSERT INTO `map_menu_role` VALUES ('166', '23', '1');

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `menu_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `group_menu_id` tinyint(3) unsigned NOT NULL,
  `menu_name` varchar(100) DEFAULT NULL,
  `menu_link` varchar(100) DEFAULT NULL,
  `menu_status_id` tinyint(4) DEFAULT NULL COMMENT '1=เปิด,   2=ปิด,  3=แสดงไม่ให้คลิก',
  `menu_openlink` tinyint(4) DEFAULT NULL COMMENT '0= หน้าเดิม , 1= หน้าใหม่',
  `menu_icon` varchar(255) DEFAULT NULL,
  `menu_sort` int(10) unsigned DEFAULT NULL,
  `menu_create` datetime DEFAULT NULL,
  `menu_update` datetime DEFAULT NULL,
  PRIMARY KEY (`menu_id`),
  KEY `fk_menu_group_menu1_idx` (`group_menu_id`),
  CONSTRAINT `menu_ibfk_1` FOREIGN KEY (`group_menu_id`) REFERENCES `group_menu` (`group_menu_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES ('23', '8', 'ผู้ใช้ระบบ', 'user', '1', '0', 'far fa-circle nav-icon', '1', null, '2018-05-31 12:16:29');
INSERT INTO `menu` VALUES ('24', '8', 'สิทธิ์การใช้งาน', 'role', '1', '0', 'far fa-circle nav-icon', '2', null, '2018-05-31 12:16:29');
INSERT INTO `menu` VALUES ('25', '8', 'กลุ่มเมนู', 'groupmenu', '1', '0', 'far fa-circle nav-icon', '3', null, '2018-05-31 12:16:29');
INSERT INTO `menu` VALUES ('32', '9', 'ประวัติใช้งานระบบ', 'loguserlogin', '1', '0', 'far fa-circle nav-icon', '32', null, '2018-05-31 12:16:29');

-- ----------------------------
-- Table structure for ref_user_status
-- ----------------------------
DROP TABLE IF EXISTS `ref_user_status`;
CREATE TABLE `ref_user_status` (
  `user_status_id` tinyint(4) NOT NULL,
  `user_status_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`user_status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ref_user_status
-- ----------------------------
INSERT INTO `ref_user_status` VALUES ('0', 'รอตรวจสอบ');
INSERT INTO `ref_user_status` VALUES ('1', 'ปกติ');
INSERT INTO `ref_user_status` VALUES ('2', 'ถูกระงับ');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `role_id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) DEFAULT NULL,
  `role_sort` tinyint(3) unsigned DEFAULT NULL,
  `role_update` datetime DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('1', 'ผู้ดูแลระบบ', '1', '2018-05-24 14:43:30');
INSERT INTO `role` VALUES ('2', 'ผู้ใช้งานทั่วไป', '2', '2018-05-24 14:43:30');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `role_id` tinyint(3) unsigned NOT NULL,
  `user_status_id` tinyint(4) NOT NULL,
  `user_username` varchar(50) DEFAULT NULL,
  `user_password` varchar(100) DEFAULT NULL,
  `user_email` varchar(100) DEFAULT NULL,
  `user_fullname` varchar(100) DEFAULT NULL,
  `user_address` text,
  `user_tel` varchar(20) DEFAULT NULL,
  `user_image` varchar(255) DEFAULT NULL,
  `user_create` datetime DEFAULT NULL,
  `user_update` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `fk_user_ref_user_status1_idx` (`user_status_id`),
  KEY `fk_user_role1_idx` (`role_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`user_status_id`) REFERENCES `ref_user_status` (`user_status_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `user_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('4', '1', '1', 'aodcat', 'ITpxJgyJvvZMro6SvHdRjv4//VXI/62mlm6EXSCWnqs=', 'aodcat@gmail.com', 'สรศักดิ์ ต้นเกณฑ์', '64/3  หมู่ 2 ต.สารภี อ.สารภี จ.เชียงใหม่ 50140', '0841703489', 'user_1591156368707.png', '2018-05-25 11:30:28', '2020-06-04 10:15:50');
INSERT INTO `user` VALUES ('56', '2', '2', 'aodcat1', '5zkW6L90zEYVBFtO4DAeAtuK0M6RoaxHCRECj4OCHnw=', '123456@123456.cc', '1234567', '-', '-', 'user_1591113310095.jpg', '2020-06-02 17:05:19', '2020-06-03 23:18:10');
INSERT INTO `user` VALUES ('57', '1', '2', 'aodcat2', 'kpIO1HSwx5HzliraNIYVAczMxhhDTvgLb33zGX0wgdA=', '111111@11.cc', '111111', '', '111111', 'user_1591095660741.png', '2020-06-02 17:16:48', '2020-06-02 23:20:58');
INSERT INTO `user` VALUES ('58', '1', '2', 'aodcat3', 'Kp0U6VisUs4antotHP7TsanRBJl09WiU21z+3RVhXmI=', 'dd@dd.cc', '123456', '6666', '555555', 'user_1591095844835.png', '2020-06-02 17:59:00', '2020-06-02 23:20:51');
INSERT INTO `user` VALUES ('59', '1', '2', 'aodcat4', 'GEJ0yBubOG79rLy2FMzY+vmTFDwl5gB5pq0MJiAp4y4=', 'sorasak@hotmial.com', 'aodcat3 sorasak', '', '0841703427', 'user_1591110028324.jpg', '2020-06-02 21:57:44', '2020-06-02 23:20:40');
INSERT INTO `user` VALUES ('60', '1', '2', 'aodcat5', 'g5beb/iG/OVyzjNY8yDwTkThHg7JlBNkS5e/1Zk5cVg=', 'aodcat5@gmail.com', 'aodcat', '-', '-', 'user_1591113108030.jpg', '2020-06-02 22:02:10', '2020-06-02 23:21:39');
INSERT INTO `user` VALUES ('61', '1', '2', 'aodcat6', '6f3ewyfIM/4un8aSc7Bz5xgxQ+7J2JGy40TsfLUOJwc=', '123456@123456.cc', '132456', '666', '555', 'none.png', '2020-06-03 10:49:41', '2020-06-03 10:53:57');
