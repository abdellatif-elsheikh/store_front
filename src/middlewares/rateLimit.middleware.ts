import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'to many requests you can try agin after 10 minutes',
});

export default limiter;
