export default date1 => {
  date1 = new Date(date1).getTime();
  let date2 = new Date().getTime();
  // console.log(`date1: ${date1}`);
  // console.log(`date2: ${date2}`);
  const difference = Math.abs(date1 - date2);
  // const difference = Math.abs(date1 - date2);
  // console.log(`difference: ${difference}`);
  const secondsDifference = Math.ceil(difference / 1000);
  const minutesDifference = Math.ceil(secondsDifference / 60);
  const hoursDifference = Math.ceil(minutesDifference / 60);
  const daysDifference = Math.ceil(hoursDifference / 24);
  const weeksDifference = Math.ceil(difference / (1000 * 60 * 60 * 24 * 7));
  const monthsDifference = Math.ceil(
    difference / (1000000 * 60 * 60 * 24 * 31)
  );
  const yearsDifference = Math.ceil(
    difference / (100 * 60 * 60 * 24 * 31 * 12)
  );

  // const secondsDifference = Math.ceil(difference);
  // const minutesDifference = Math.ceil(difference / (1000 * 60));
  // const hoursDifference = Math.ceil(difference / (1000 * 60 * 60));
  // const daysDifference = Math.ceil(difference / (1000 * 60 * 60 * 24));
  // const weeksDifference = Math.ceil(difference / (1000 * 60 * 60 * 24 * 7));
  // const monthsDifference = Math.ceil(
  //   difference / (1000000 * 60 * 60 * 24 * 31)
  // );
  // const yearsDifference = Math.ceil(
  //   difference / (100 * 60 * 60 * 24 * 31 * 12)
  // );
  // console.log(
  //   `Difference: ${difference}, seconds: ${secondsDifference}, minutes: ${minutesDifference}, hours: ${hoursDifference}, days: ${daysDifference}, weeks: ${weeksDifference}, months: ${monthsDifference}, years: ${yearsDifference}`
  // );
  // console.log(`less than a minute: ${secondsDifference < 60}`);
  // console.log(`less than an hour: ${minutesDifference < 60}`);
  // console.log(`less than a day: ${hoursDifference < 24}`);
  // console.log(`less than a week: ${daysDifference < 7}`);
  // console.log(`less than a month: ${daysDifference < 31}`);
  // console.log(`less than a year: ${monthsDifference < 12}`);
  // console.log(`more than a year: ${monthsDifference > 12}`);
  if (secondsDifference < 60) return secondsDifference + " seconds ago";
  if (minutesDifference < 60) return minutesDifference + " minutes ago";
  if (hoursDifference < 24) return hoursDifference + " hours ago";
  if (daysDifference < 7) return daysDifference + " days ago";
  if (daysDifference < 31) return weeksDifference + " weeks ago";
  if (monthsDifference < 12) return monthsDifference + " months ago";
  if (monthsDifference > 12) return yearsDifference + " years ago";
  // console.log(
  //   secondsDifference,
  //   minutesDifference,
  //   daysDifference,
  //   weeksDifference,
  //   monthsDifference,
  //   yearsDifference
  // );
  return null;
  // return `Difference: ${difference}, seconds: ${secondsDifference}, minutes: ${minutesDifference}, hours: ${hoursDifference}, days: ${daysDifference}, weeks: ${weeksDifference}, months: ${monthsDifference}, years: ${yearsDifference}`;
};
