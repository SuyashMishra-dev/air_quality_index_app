import TimeAgo from "javascript-time-ago";
import schema from "./schema.json";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);

const { colorCode } = schema;

export const convertData = (data) => {
  let chart_data = Object.keys(data).map((el) => {
    let obj = {};
    obj.city = el || "";
    obj.updated_at = data[el]["prevData"][data[el]["prevData"].length - 1].updated_at;
    obj.aqi = data[el]["prevData"][data[el]["prevData"].length - 1].aqi || 0;
    return obj;
  });
  return chart_data;
};

export const convertToTableColumnData = (data, updated_at) => {
  const timeAgo = new TimeAgo("en-US");
  // console.log('--->>', data);
  let tableData = Object.keys(data).map((el) => {
    let obj = {};
    obj.city = el || "";
    obj.updated_at = data[el]["prevData"][data[el]["prevData"].length - 1].updated_at;

    obj.aqi = data[el]["prevData"][data[el]["prevData"].length - 1].aqi || 0;

    if (obj.updated_at === updated_at) {
      obj.last_updated = "Just now";
    } else {
      obj.last_updated =
        timeAgo.format(new Date(obj.updated_at), "mini-now") + " ago";
    }
    return obj;
  });
  return tableData;
};

export const getColorCode = (val) => {
  if (val <= 50) {
    return colorCode.good;
  } else if (val > 50 && val <= 100) {
    return colorCode.satisfactory;
  } else if (val > 100 && val <= 200) {
    return colorCode.moderate;
  } else if (val > 200 && val <= 300) {
    return colorCode.poor;
  } else if (val > 300 && val <= 400) {
    return colorCode.very_poor;
  } else if (val > 400 && val <= 500) {
    return colorCode.severe;
  }
};

export const createChartAnnotation = (val) => {
  return {
    start: [0, 1],
    end: [val, 1],
    style: {
      stroke: getColorCode(val),
      lineWidth: 25,
      lineDash: null,
    },
  };
};


const getTimeFromTimeStamp = (timeStamp) => {
  let date = new Date(timeStamp);
  // Hours part from the timestamp
  let hours = date.getHours();
  // Minutes part from the timestamp
  let minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  let seconds = "0" + date.getSeconds();
  return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
} 

export const createLineChartData = (data, city) => {
  const selectedCityData = data[city]?.prevData.slice(-20) || [];
  let tableData = selectedCityData.map((el) => {
    let obj = {};
    obj.time = getTimeFromTimeStamp(el.updated_at);
    obj.aqi = el.aqi || 0;
    return obj;
  });
  return tableData;
}
