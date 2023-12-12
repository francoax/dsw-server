/* eslint-disable import/extensions */
import moment from 'moment-timezone';
import Property from '../models/Property.js';
import Reserve from '../models/reserve.js';

const today = moment.tz('America/Argentina/Buenos_Aires').format('YYYY-MM-DD');

const getReservesByScope = async (scope) => {
  try {
    const query = scope === 'start'
      ? {
        $or: [
          { date_start: { $eq: today } },
        ],
      }
      : {
        $or: [
          { date_end: { $eq: today } },
        ],
      };
    const reserves = await Reserve.find({ ...query }).populate(
      { path: 'packageReserved', populate: 'property' },
    ).lean();

    return reserves;
  } catch (error) {
    return error.message;
  }
};

const updateProperties = async (properties) => {
  properties.forEach((prop) => {
    Property.findByIdAndUpdate(prop._id, { ...prop })
      .then(() => {})
      .catch((e) => console.log(e.message));
  });
};

export { getReservesByScope, updateProperties };
