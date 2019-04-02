import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
// import Sequelize from 'sequelize';

import DB from '../models';
import config from '../config';

const { Sequelize, sequelize, User, Laporan } = DB;

const Op = Sequelize.Op;

async function create(req, res) {
  try {
    const { email, password, fullname } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    const count = await User.count({ where: { email } });
    if (count !== 0) {
      res.status(409).send({ message: 'Email already used!' });
    } else {
      const user = await User.create({
        email,
        fullname,
        password: hashedPassword,
        role: 'user'
      });
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          fullname: user.fullname,
          role: user.role
        },
        config.jwtSecret,
        {
          expiresIn: config.jwtExpiration
        }
      );
      res.status(201).send({ token });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email }
    });

    if (!user) {
      return res.status(404).send({
        message: 'User not found!'
      });
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) res.status(401).send({ message: 'unauthenticated' });

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        fullname: user.fullname,
        role: user.role
      },
      config.jwtSecret,
      {
        expiresIn: '10h'
      }
    );
    res.status(200).send({ token });
  } catch (error) {
    res.status(400).send(error);
  }
}

async function me(req, res) {
  try {
    const auth = req.auth;
    const user = await User.findByPk(auth.id, {
      include: [
        {
          model: Laporan,
          as: 'laporan',
          attributes: {
            exclude: ['userId']
          }
        }
      ]
    });
    if (!user) {
      return res.status(404).send({
        message: 'User not found!'
      });
    }

    res.status(200).send({
      id: user.id,
      email: user.email,
      fullname: user.fullname,
      role: user.role,
      laporan: user.laporan
    });
  } catch (error) {
    res.status(400).send(error);
  }
}

export default {
  create,
  login,
  me
};
