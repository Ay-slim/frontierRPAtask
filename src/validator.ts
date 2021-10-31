import { object, string } from 'joi';
import { Request, Response, NextFunction } from 'express'
import { logger } from './helpers'
/**
 * @constant
 * Specifies the required or optional fields in request object
 */
const candidateDataSchema = object({
    firstname: string().required(),
    lastname: string().required(),
    email: string().required(),
    phone: string(),
    location: string().required(),
    linkedin: string(),
    resume: string().required(),
    webhook: string()
  });

/**
 * @function
 * Middleware that enforces the schema on incoming request
 * @param {*} req Request object
 * @param {*} res Response to return
 * @param {*} next Moves to the next handler
 */
export async function validateCandidateData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const valid = await candidateDataSchema.validateAsync(req.body);
    req.body = valid;
    return next();
  } catch (error: any) {
    logger('error', error?.message || error)
    res.status(422).json({status: 'failed', message: error.details[0].message});
  }
}