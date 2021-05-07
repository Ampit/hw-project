import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
} from "./store/conversations";

class Socket {
  constructor() {
    this.socket = null;
  }

  get instance() {
    if (!this.socket) this.init();
    return this.socket;
  }

  init() {
    let token = localStorage.getItem("messenger-token");
    // set compatibility for cookie x-access-token later
    this.socket = io(window.location.origin, {
      extraHeaders: { Authorization: `Bearer ${token}` },
    });

    this.socket.on("connect", () => {
      this.socket.on("add-online-user", (id) => {
        store.dispatch(addOnlineUser(id));
      });

      this.socket.on("remove-offline-user", (id) => {
        store.dispatch(removeOfflineUser(id));
      });
      this.socket.on("new-message", (data) => {
        store.dispatch(setNewMessage(data.message, data.sender));
      });
      this.socket.on("unauthorized", (error) => {
        if (
          error.data.type === "UnauthorizedError" ||
          error.data.code === "invalid_token"
        ) {
          // redirect user to login page perhaps?
          console.log("User token has expired. Please Login Again");
        }
      });
    });
  }
}

export default new Socket();
