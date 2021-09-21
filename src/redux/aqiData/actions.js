import { w3cwebsocket } from "websocket";
import { WEB_SOCKET_CONNECTING_URL } from "../../config";
import { ON_CONNECTION, ON_DATA } from "./actionTypes";

export const onConnection = () => ({
  type: ON_CONNECTION,
});
export const onData = (payload) => ({
  type: ON_DATA,
  payload,
});
export const fetchAqiData = (dispatch) => {
  const client = new w3cwebsocket(WEB_SOCKET_CONNECTING_URL);
  client.onopen = () => {
    console.log("webSocket connected!!");
    dispatch(onConnection());
  };
  client.onmessage = (message) => {
    let socket_data = JSON.parse(message.data);
    dispatch(onData(socket_data));
  };
};
