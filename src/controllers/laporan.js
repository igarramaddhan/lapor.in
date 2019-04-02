import DB from '../models';
import config from '../config';
const { Sequelize, sequelize, Laporan, User } = DB;

async function create(req, res) {
  try {
    const { description, longitude, latitude } = req.body;
    const auth = req.auth;

    const laporan = await Laporan.create({
      description,
      longitude,
      latitude,
      status: 'pending',
      image: `${req.headers.host}/images/${req.file.filename}`,
      userId: auth.id
    });

    res.status(201).send(laporan);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}

async function getAll(req, res) {
  try {
    const laporan = await Laporan.findAll({
      order: [['createdAt', 'DESC']],
      attributes: {
        exclude: ['userId']
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'email']
        }
      ]
    });

    res.status(200).send({
      laporan
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}

export default {
  create,
  getAll
};
