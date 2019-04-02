import user from './user';
import laporan from './laporan';

module.exports = app => {
  {
    app.get('/api', (req, res) =>
      res.status(200).send({
        message: 'Welcome to the Laporin API!'
      })
    );

    app.use('/api', user);
    app.use('/api/laporan', laporan);
  }
};
