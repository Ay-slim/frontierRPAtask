import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { rpaController } from './controller';
import { APP_USE_LIMIT } from './helpers';
import { validateCandidateData } from './validator';

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(APP_USE_LIMIT)

export const FORM_URL = '/forms/frontier/applications';

app.post(FORM_URL, validateCandidateData, rpaController);

app.listen(process.env.PORT || 5500, () =>
  console.log(`App running on port ${process.env.PORT || 5500}`)
);

export default app;
