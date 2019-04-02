import express from 'express';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import auth from '../middlewares/auth';
import controllers from '../controllers';

const { laporan } = controllers;

const app = express.Router();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../../public/images'));
  },
  filename: function(req, file, cb) {
    cb(
      null,
      crypto.randomBytes(18).toString('hex') + path.extname(file.originalname)
    );
  }
});

const upload = multer({ storage: storage });

app.post('/create', [auth, upload.single('image')], laporan.create);
app.get('/', auth, laporan.getAll);

export default app;
