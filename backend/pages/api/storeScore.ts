// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { kv } from '@vercel/kv'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userName = req.body['name']
  const score = req.body['score']
  if (!userName || score === undefined) {
    return res.status(400).json({ error: 'Name and score are required.' })
  }

  try {
    await kv.lpush(`score:${score}`, userName)
    res.status(200).json({ message: 'saved.' })
  } catch (error) {
    console.error('error storing: ', error)
    res.status(500).json({ error: 'Failed to save score.' })
  }
}
