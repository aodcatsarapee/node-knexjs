const db = require("../../config/db.config");
module.exports = {
    async checkRole(req,menu_id) {
        let counter = await db
            .select("map_menu_role.menu_id")
            .from("map_menu_role")
            .join("user", "user.role_id", "=", "map_menu_role.role_id")
            .where("user.user_id", req.jwt_session.user.user_id)
            .where("map_menu_role.menu_id", menu_id);
        return (counter.length > 0 ? true : false)
    }
};
