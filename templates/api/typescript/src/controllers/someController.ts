import type { Request, Response } from 'express'

const someController = (req: Request, res: Response) => {
  const responseData = {
    message: 'Hello, from the API!'
  }
  res.status(200).json(responseData)
}
export default someController
