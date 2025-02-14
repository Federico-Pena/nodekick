const someController = (req, res) => {
  const responseData = {
    message: 'Hello, from the API!'
  }
  res.status(200).json(responseData)
}
export default someController
