// pages/api/data.ts
import { FoodItem } from '@/interfaces/data';
import { query } from '@/utils/db';
import type { NextApiRequest, NextApiResponse } from 'next';


const initialFoodItems: Array<FoodItem> = [
    { item: 'Apple', desc: 'Green Apple', expDate: new Date('2024-03-20') },
    { item: 'Banana', desc: 'Yellow Banana', expDate: new Date('2024-03-18') },
    { item: 'Carrot', desc: 'Fresh Carrot', expDate: new Date('2024-03-22') },
  ];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handling GET request
  if (req.method === 'GET') {
    try {
    //   const results = await query('SELECT * FROM your_table_name');
    const results = initialFoodItems;
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  }
  // Handling POST request
  else if (req.method === 'POST') {
    const { someData } = req.body;

    try {
      const result = await query(
        'INSERT INTO your_table_name (column_name) VALUES (?)',
        [someData]
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to insert data' });
    }
  }
  // Respond with 405 Method Not Allowed if the request HTTP method is not supported
  else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
