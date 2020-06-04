const db = require("../../config/db.config")
module.exports = {
  getGroupMenu() {
    return db.select("group_menu.group_menu_id", "group_menu.group_menu_name", "group_menu.group_menu_icon", "group_menu.group_menu_sort")
      .count('menu.menu_id as count_menu')
      .from("group_menu")
      .leftJoin("menu", "menu.group_menu_id", "group_menu.group_menu_id")
      .groupBy("group_menu.group_menu_id").orderBy("group_menu.group_menu_sort")
  },
  getGroupMenuByID(group_menu_id) {
    return db.select("group_menu.group_menu_id", "group_menu.group_menu_name", "group_menu.group_menu_icon", "group_menu.group_menu_sort")
      .from("group_menu")
      .where("group_menu.group_menu_id", group_menu_id)
  },
  addGroupMenu(data) {
    return db("group_menu").insert(data);
  },
  updateGroupMenu(group_menu_id, data) {
    return db("group_menu").update(data).where("group_menu.group_menu_id", group_menu_id);
  },
  deleteGroupMenu(group_menu_id) {
    return db("group_menu").where("group_menu.group_menu_id", group_menu_id).del();
  }
}