import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Mask sensitive headers
  const headers = { ...req.headers } as Record<string, any>;
  if (headers.authorization) headers.authorization = '[REDACTED]';

  res.status(200).json({
    method: req.method,
    headers: Object.keys(headers),
    body: req.body,
  });
}
