/* eslint-disable import/extensions */
import moment from 'moment-timezone';
import Property from '../models/Property.js';
import Reserve from '../models/reserve.js';

const today = moment.tz('America/Argentina/Buenos_Aires').format('YYYY-MM-DD');
const todayDate = new Date(today);

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

const getReservesToRemind = async () => {
  try {
    let reserves = await Reserve.aggregate([
      {
        $addFields: {
          daysDifference: {
            $dateDiff: {
              startDate: todayDate,
              endDate: '$date_start',
              unit: 'day',
            },
          },
        },
      },
      {
        $match: {
          daysDifference: 5,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $lookup: {
          from: 'packages',
          localField: 'packageReserved',
          foreignField: '_id',
          as: 'packageReserved',
        },
      },
      {
        $lookup: {
          from: 'properties',
          localField: 'packageReserved.property',
          foreignField: '_id',
          as: 'property',
        },
      },
      {
        $lookup: {
          from: 'localities',
          localField: 'property.location',
          foreignField: '_id',
          as: 'location',
        },
      },
      {
        $addFields: {
          'property.location': { $arrayElemAt: ['$location', 0] },
        },
      },
      {
        $unset: 'location',
      },
    ]);

    reserves = reserves.map((r) => ({
      ...r, user: r.user[0], property: r.property[0], packageReserved: r.packageReserved[0],
    }));

    return reserves;
  } catch (error) {
    return error.message;
  }
};

export { getReservesByScope, updateProperties, getReservesToRemind };
