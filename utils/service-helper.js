module.exports.getSuccessResponse = (data) => {
  return { data };
};

module.exports.getFailResponse = (error) => {
  return { error };
};
