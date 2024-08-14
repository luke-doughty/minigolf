// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { kv } from '@vercel/kv'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const allKeys = await kv.keys('score:*')
  allKeys.sort((a, b) => {
    const aNum = a.match(/\d+$/)
    const bNum = b.match(/\d+$/)
    if (aNum && bNum) {
      return parseInt(aNum[0], 10) - parseInt(bNum[0], 10)
    }
    return 0
  })
  const scoreNames = await allKeys.map(async (scoreValue) => {
    const names = await kv.lrange(scoreValue, 0, -1)
    return { score: parseInt(scoreValue.replace('score:', ''), 10), names: names }
  })

  const scores = await Promise.all(scoreNames)
  res.status(200).json(scores)
}
