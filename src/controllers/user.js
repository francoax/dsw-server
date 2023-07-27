import User from '../models/user';

const getAll = async (req, res) => {
  const filter = req.query;

  console.log(filter);

  const users = await User.find({ filter });

  if (users.length === 0) {
    return res.status(404).json({
      message: 'There are not users yet...',
      data: [],
      error: true,
    });
  }

  return res.status(200).json({
    message: 'Users list',
    data: users,
    error: false,
  });
};

const create = () => {};

const edit = () => {};

const remove = () => {};

export default {
  getAll, create, edit, remove,
};
