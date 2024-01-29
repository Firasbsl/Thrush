import nc from 'next-connect';
import Instrument from '../../../models/instrument';
import db from '../../../utils/db';
import data from '../../../utils/instrument/data';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  await Instrument.insertMany(data.instruments);
  console.log('done');
  await db.disconnect();
  res.send({ message: 'seeded successfully' });
});

export default handler;