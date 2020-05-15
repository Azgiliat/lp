export function loadMessages({commit}) {
  commit('setLoadingStatus', true);
  new Promise((resolve, reject) => {
    setTimeout(() => {
      // типа загрузили всё что хотели
      if (Math.random() > 0.3) {
        resolve();
      } else { // или возникла ошибка
        reject();
      }
    }, 2000)
  })
    .then(() => {
      commit('setError', '');
      commit('setLoadingStatus', false);
    })
    .catch(() => {
      commit('setError', 'Возникла ошибка при загрузке данных. Повторите позже.');
      commit('setLoadingStatus', false);
    })
}

export function sendMessage({commit, getters}, payload) {
  const currentDialog = getters['getCurrentDialog'],
    lastMessageId = currentDialog.parts[currentDialog.parts.length - 1].id;

  commit('setMessageSendingStatus', true);
  commit('pushMessage', {
    messages: currentDialog.parts,
    newMessage: {
      id: lastMessageId + 1,
      author: getters['getUsername'],
      text: payload,
      created: new Date(Date.now()).toLocaleString().replace(',', ''),
      sendingError: false
    }
  });

  new Promise((resolve, reject) => {
    setTimeout(() => {
      // отправляем сообщение
      if (Math.random() > 0.3) {
        resolve();
      } else { // возникла ошибка
        reject();
      }
    }, 2000)
  })
    .then(() => {
      commit('setMessageSendingStatus', false);
    })
    .catch(() => {
      commit('setMessageSendingError', {
        payload: true,
        id: lastMessageId + 1,
        messages: currentDialog.parts
      });
      commit('setMessageSendingStatus', false);
    })
}

export function resendMessage({commit, getters}, payload) {
  const currentDialog = getters['getCurrentDialog'];

  commit('setMessageSendingStatus', true);

  new Promise((resolve, reject) => {
    setTimeout(() => {
      // отправляем сообщение
      if (Math.random() > 0.3) {
        resolve();
      } else { // возникла ошибка
        reject();
      }
    }, 2000)
  })
    .then(() => {
      commit('setMessageSendingError', {
        payload: false,
        id: payload,
        messages: currentDialog.parts
      });
      commit('setMessageSendingStatus', false);
    })
    .catch(() => {
      commit('setMessageSendingError', {
        payload: true,
        id: payload,
        messages: currentDialog.parts
      });
      commit('setMessageSendingStatus', false);
    })
}
