function getDateDiff(dateTimeStamp) {
  var result;
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var halfamonth = day * 15;
  var month = day * 30;
  var now = new Date().getTime();
  var diffValue = now - dateTimeStamp;
  if (diffValue < 0) {
    return;
  }
  var monthC = diffValue / month;
  var weekC = diffValue / (7 * day);
  var dayC = diffValue / day;
  var hourC = diffValue / hour;
  var minC = diffValue / minute;
  if (monthC >= 1) {
    if (monthC <= 12)
      result = "" + parseInt(monthC) + " month(s) ago";
    else {
      result = "" + parseInt(monthC / 12) + " year(s) ago";
    }
  }
  else if (weekC >= 1) {
    result = "" + parseInt(weekC) + " week(s) ago";
  }
  else if (dayC >= 1) {
    result = "" + parseInt(dayC) + " day(s) ago";
  }
  else if (hourC >= 1) {
    result = "" + parseInt(hourC) + " hour(s) ago";
  }
  else if (minC >= 1) {
    result = "" + parseInt(minC) + " minute(s) ago";
  } else {
    result = "moment";
  }
  return result;
}
module.exports = {
  getDateDiff: getDateDiff
}
