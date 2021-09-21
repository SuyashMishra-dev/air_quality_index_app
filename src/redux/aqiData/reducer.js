import { ON_CONNECTION, ON_DATA, ON_LOADING } from "./actionTypes";

const initialState = {
  connectionStatus: false,
  data: [],
  updated_at: null,
  isLoading: false,
};

const aqiReducer = (state = initialState, action) => {
  const { type } = action;
  switch ( type ) {
    case ON_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    case ON_CONNECTION:
      return {
        ...state,
        connectionStatus: true,
        isLoading: false,
      };
    case ON_DATA:
      const { payload } = action;
      let new_data = { ...state.data };
      let date = Date.now();
      payload.forEach((element) => {
        if (new_data[element.city]) {
          new_data[element.city] = {
            prevData: [
              ...new_data[element.city]["prevData"],
              {
                aqi: parseFloat(element.aqi.toFixed(2)),
                updated_at: date,
              }
            ]
          };
        } else {
          new_data[element.city] = {
            prevData: [
              {
                aqi: parseFloat(element.aqi.toFixed(2)),
                updated_at: date,
              }
            ],
          };
        }
      });
      return {
        ...state,
        data: new_data,
        updated_at: date,
      };
    default:
      return state;
  }
}

export default aqiReducer;