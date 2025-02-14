const someController = (req, res) => {
  const responseData = {
    message: "Hello, from the API!"
  };
  res.status(200).json(responseData);
};
var someController_default = someController;
export {
  someController_default as default
};
