const db = require("../../config/db.config")
module.exports = {
  getListRole() {
    return db
      .select("role.role_id", 'role.role_name')
      .from("role")
  },
  getListMenu(role_id) {
    return db
      .select("*")
      .from("group_menu")
      .join("menu", "menu.group_menu_id", "=", "group_menu.group_menu_id")
      .join("map_menu_role", "map_menu_role.menu_id", "=", "menu.menu_id").where("map_menu_role.role_id", role_id)
  },
  getListMenuNotin(menu_id) {
    return db
      .select("*")
      .from("menu")
      .leftJoin("group_menu", "group_menu.group_menu_id", "=", "menu.group_menu_id")
      .whereNotIn('menu.menu_id', menu_id)
  },
  checkMapMemuRole(role, menu_id) {
    return db
      .select("*")
      .from("map_menu_role")
      .where("map_menu_role.role_id", role)
      .where("map_menu_role.menu_id", menu_id)
  },
  addMapMenuRole(data) {
    return db("map_menu_role").insert(data)
  },
  deleteMapMenuRole(role_id, menu_id) {
    return db("map_menu_role")
      .where("map_menu_role.role_id", role_id)
      .where("map_menu_role.menu_id", menu_id)
      .del();
  }
}