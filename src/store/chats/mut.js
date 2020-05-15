export function setLoadingStatus(state, payload) {
  state.loadingStatus = payload;
}

export function setError(state, payload) {
  state.error = payload;
}

export function setCurrentDialogId(state, payload) {
  state.currentDialogId = payload;
}

export function pushMessage(state, payload) {
  payload.messages.push(payload.newMessage);
}

export function setMessageSendingStatus(state, payload) {
  state.messageSendingStatus = payload;
}

export function setMessageSendingError(state, payload) {
  payload.messages.find(({id}) => id === payload.id).sendingError = payload.payload;
}
