const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://little-steps-leleka.com',
];

export const corsConfig = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
};
