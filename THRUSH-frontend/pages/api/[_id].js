import nc from 'next-connect';
import Instrument from '../../models/instrument';
import db from '../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const instrument = await Instrument.findById(req.query.id);
  await db.disconnect();
  res.send(instrument);
});

export default handler;