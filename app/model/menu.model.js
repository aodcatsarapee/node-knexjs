const db = require("../../config/db.config")
module.exports = {
    getMenu(group_menu_id) {
    return db.select("menu.*")
      .count('map_menu_role.menu_id as count')
      .from("menu")
      .leftJoin("map_menu_role", "map_menu_role.menu_id", "menu.menu_id")
      .where("menu.group_menu_id",group_menu_id)
      .groupBy("menu.menu_id").orderBy("menu.menu_sort")
  },
  getMenuByID(menu_id) {
    return db.select("*")
      .from("menu")
      .where("menu.menu_id", menu_id)
  },
  addMenu(data) {
    return db("menu").insert(data);
  },
  updateMenu(menu_id, data) {
    return db("menu").update(data).where("menu.menu_id", menu_id);
  },
  deleteMenu(menu_id) {
    return db("menu").where("menu.menu_id", menu_id).del();
  }
}