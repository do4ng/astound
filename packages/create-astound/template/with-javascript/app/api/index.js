function get({ req, res }) {
  res.send({ message: 'hello' });
}

module.exports.get = get;
