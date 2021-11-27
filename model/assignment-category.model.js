const db = require("../utils/db");

const TBL_ASSIGNMENT_CATEGORY = "assignment_category";

module.exports = {
  async allByCourse(course_id) {
    return await db.load(
      `select * from ${TBL_ASSIGNMENT_CATEGORY} 
            where course_id = ${course_id}
            order by position
      `
    );
  },

  async single(id) {
    const rows = await db.load(
      `select * from ${TBL_ASSIGNMENT_CATEGORY} where id = ${id}`
    );

    return rows.length ? rows[0] : null;
  },

  async singleByName(name, courseId) {
    const rows = await db.load(
      `select * from ${TBL_ASSIGNMENT_CATEGORY} where name = '${name}' and course_id = ${courseId}`
    );

    return rows.length ? rows[0] : null;
  },

  add(name, point, course_id, position) {
    const entity = {
      name,
      point,
      course_id,
      position,
    };
    return db.add(entity, TBL_ASSIGNMENT_CATEGORY);
  },

  del(entity) {
    const condition = { id: entity.id };
    return db.load(
      `delete from ${TBL_ASSIGNMENT_CATEGORY} where id = ${condition.id}`
    );
  },

  patch(entity) {
    const condition = { id: entity.id };
    return db.patch(entity, condition, TBL_ASSIGNMENT_CATEGORY);
  },

  patchMany(categories) {
    categories.forEach((category) => {
      const condition = { id: category.id };
      db.patch(category, condition, TBL_ASSIGNMENT_CATEGORY);
    });
  },

  async currentFinalPositionOfCourse(course_id) {
    const rows = await db.load(
      `select max(position)
            as finalPosition
            from ${TBL_ASSIGNMENT_CATEGORY}
            where course_id = ${course_id}
      `
    );

    const { finalPosition } = rows[0];

    return finalPosition !== null ? finalPosition : -1;
  },
};
