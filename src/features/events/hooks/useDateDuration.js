// import { useEffect, useState } from 'react';

export const useDateDuration = (startDate, endDate) => { 
  const durationInMs = new Date(endDate).getTime() - new Date(startDate).getTime();
  const durationInSeconds = Math.floor(durationInMs / 1000);
  const durationInMinutes = Math.floor(durationInSeconds / 60);
  const durationInHours = Math.floor(durationInMinutes / 60);
  const durationInDays = Math.floor(durationInHours / 24);

  const restHours = durationInHours % 24;
  const restMinutes = durationInMinutes % 60;
  const restSeconds = durationInSeconds % 60;

  let durationString = '';

  if (durationInDays > 0) {
    durationString += `${durationInDays} day${durationInDays > 1 ? 's' : ''} `;
  }

  if (restHours > 0) {
    durationString += `${restHours} hour${restHours > 1 ? 's' : ''} `;
  }

  if (restMinutes > 0) {
    durationString += `${restMinutes} minute${restMinutes > 1 ? 's' : ''} `;
  }

  if (restSeconds > 0) {
    durationString += `${restSeconds} second${restSeconds > 1 ? 's' : ''} `;
  } 
  
  return durationString.trim()
}

 