import Package from '../models/package.js';

const getPackageById = async (id) => {
  try {
    const packageSearched = await Package.findById(id).populate(
      [
        { path: 'property' },
      ],
    );

    return packageSearched;
  } catch (error) {
    return error;
  }
};

export default getPackageById;
