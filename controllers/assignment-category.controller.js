const assignmentCategoryService = require("../services/assignment-category.service");

module.exports = {
  async getAllByCourse(req, res, next) {
    const result = await assignmentCategoryService.getAllByCourse(
      req.query.course_id,
      req.user.user_id
    );

    processResult(result, res);
  },
  async add(req, res, next) {
    const result = await assignmentCategoryService.add(
      req.body.name,
      req.body.point,
      req.body.course_id,
      req.user.user_id
    );

    return processResult(result, res);
  },

  async update(req, res, next) {
    const result = await assignmentCategoryService.update(
      req.body.assignmentCategoryId,
      req.body.newName,
      req.body.newPoint,
      req.user.user_id
    );

    return processResult(result, res);
  },

  async updatePosition(req, res, next) {
    const result = await assignmentCategoryService.updatePosition(
      req.body.assignmentCategories,
      req.user.user_id
    );

    return processResult(result, res);
  },

  async delete(req, res, next) {
    const result = await assignmentCategoryService.delete(
      req.body.assignmentCategoryId,
      req.user.user_id
    );

    return processResult(result, res);
  },

  async finalize(req, res, next) {
    const result = await assignmentCategoryService.finalize(
      req.body.assignmentCategoryId,
      req.user.user_id
    );

    return processResult(result, res);
  },
};

const processResult = (result, res) => {
  const defaultRes = {
    result: 0,
    message: "",
    content: {},
  };
  if (result.error) {
    res.status(404).json({
      ...defaultRes,
      message: result.error,
    });
  } else if (result.data) {
    res.status(200).json({ ...defaultRes, content: result.data });
  } else {
    res.status(200).json(defaultRes);
  }
};
