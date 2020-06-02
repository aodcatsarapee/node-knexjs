const db = require("../../config/db.config");
module.exports = {
  getAssessControl(role_id) {
    return db
      .select(
        "group_menu.group_menu_id",
        "group_menu.group_menu_icon",
        "group_menu.group_menu_name"
      )
      .from("map_menu_role")
      .join("menu", "menu.menu_id ", "=", "map_menu_role.menu_id")
      .join(
        "group_menu",
        "group_menu.group_menu_id ",
        "=",
        "menu.group_menu_id"
      )
      .where("map_menu_role.role_id", role_id)
      .groupBy("group_menu.group_menu_id")
      .orderBy("group_menu.group_menu_sort");
  },
  getMenu(group_menu_id, role_id) {
    return db
      .select("menu.*")
      .from("group_menu")
      .join("menu", "menu.group_menu_id ", "=", "group_menu.group_menu_id")
      .join("map_menu_role", "map_menu_role.menu_id", "=", "menu.menu_id")
      .where("group_menu.group_menu_id", group_menu_id)
      .where("map_menu_role.role_id", role_id)
      .whereIn("menu.menu_status_id", [1, 3])
      .orderBy("menu.menu_sort");
  },
  checkRole(role_id, menu_id) {
    return db
      .select("*")
      .from("map_menu_role")
      .where("map_menu_role.role_id", role_id)
      .where("map_menu_role.menu_id", menu_id);
  },
  getRole() {
    return db
      .select("role.role_id", 'role.role_name')
      .from("role")
  }
};
