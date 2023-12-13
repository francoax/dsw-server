/* eslint-disable import/extensions */
/* eslint-disable max-len */
import cron from 'node-cron';
import { getReservesByScope, updateProperties } from './services/reserves.service.js';

const updatePropertiesOnStart = async () => {
  try {
    const reservesStarting = await getReservesByScope('start');
    if (reservesStarting.length === 0) {
      return;
    }
    const propertiesUpdated = reservesStarting.map((r) => r.packageReserved.property).map((p) => ({ ...p, status: 'occupied' }));
    await updateProperties(propertiesUpdated);

    console.log('[SERVER]: properties on start date updated to => occupied');
  } catch (error) {
    console.log(error.message);
  }
};

const updatePropertiesOnEnd = async () => {
  try {
    const reservesEnding = await getReservesByScope('end');
    if (reservesEnding.length === 0) {
      return;
    }
    const propertiesUpdated = reservesEnding.map((r) => r.packageReserved.property).map((p) => ({ ...p, status: 'available' }));
    await updateProperties(propertiesUpdated);

    console.log('[SERVER]: properties on end date updated to => available');
  } catch (error) {
    console.log(error.message);
  }
};

const scheduleTasks = () => {
  cron.schedule('0 0 * * * ', updatePropertiesOnStart);
  cron.schedule('0 0 * * * ', updatePropertiesOnEnd);
};

export default { scheduleTasks };
