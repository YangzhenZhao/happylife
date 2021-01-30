interface IndexItem {
  name: string;
  type: string;
  text: string;
}
export interface LifeIndexResponse {
  data: {
    daily: IndexItem[];
  };
}
export interface NowWeatherResponse {
  data: {
    now: {
      humidity: string;
      windScale: string;
      windDir: string;
    };
  };
}
interface WarningItem {
  sender: string;
  text: string;
}
export interface WarningResponse {
  data: {
    warning: WarningItem[];
  };
}
interface ThreeDayItem {
  sunrise: string;
  sunset: string;
}
export interface ThreeDayResponse {
  data: {
    daily: ThreeDayItem[];
  };
}
const rearrangeIds = [
  9, 10, 8, 12, 2, 15, 3, 0, 1, 4, 5, 6, 7, 11, 13, 14
]

const rearrangeDailyData = (dailyData: IndexItem[]) => {
  const resList = []
  for (let i = 0; i < rearrangeIds.length; i++) {
    resList.push(dailyData[rearrangeIds[i]])
  }
  return resList
}

export default rearrangeDailyData
