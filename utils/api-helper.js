module.exports.processResult = (result, res) => {
  const defaultRes = {
    result: 0,
    message: "",
    content: {},
  };
  if (result.error) {
    res.status(200).json({
      ...defaultRes,
      message: result.error,
    });
  } else if (result.data) {
    res.status(200).json({ ...defaultRes, content: result.data });
  } else {
    res.status(200).json(defaultRes);
  }
};
