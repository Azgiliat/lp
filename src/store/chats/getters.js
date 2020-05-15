export function getAllDialogs(state) {
  return state.dialogs;
}

export function getSingleDialog(state) {
  return function (searchId) {
    return state.dialogs.find(({id}) => id === searchId);
  }
}

export function getUsername(state) {
  return state.username;
}

export function getCurrentDialogId(state) {
  return state.currentDialogId;
}

export function getCurrentDialog(state, getters) {
  return getters['getSingleDialog'](getters['getCurrentDialogId'])
}

export function getMessages(state, getters) {
  return getters['getSingleDialog']
}

export function getMessageSendingStatus(state) {
  return state.messageSendingStatus;
}

export function getLoadingStatus(state) {
  return state.loadingStatus;
}

export function getError(state) {
  return state.error;
}

export function getNumberOfMessages(state) {
  return state.dialogs.reduce((accum, currentDialog) => accum + currentDialog.parts.length, 0);
}
