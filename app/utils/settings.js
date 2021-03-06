import _ from 'lodash';

export const defaultStoreStructure = {
  settings: {
    wideScreen: true,
    wideScreenSpecial: false,
    threadPreview: true,
    adsRemove: true,
    linkHelper: true,
    notifyQuote: true,
    emotionHelper: true,
    minimizeQuote: true,
    quickPostQuotation: true,
    reloadButton: true,
    autoGotoNewthread: false,
    savePostEnable: true,
    autoHideSidebar: false,
    peerChatEnable: false,
    capturePostEnable: true,
    LinhXinhBtn: true,
    userStyle: '',
    delay: 1, // minute
    delayFollowThread: 5, // minute
    newThreadUI: false,
    stickerPanelExpand: false,
    smartSelection: false,
    enableRichEditor: false,
    eyesSchedule: false,
    eyesDuration: '18:15',
    eyesDurationEnd: '05:30',
    enableDarkMode: false,
    enableWarmMode: false,
    lightAdjust: '0.4',
    enableEyesNotify: true,
    delayEyesNotify: '30',   // minute
    advancedNotifyQuote: false,
    multiAcc: false,
    disableNextVoz: true,
    uploader: 'imgur',
    lagReducer: true,
    threadFilter: false,
    compactMenu: false,
    getThreadDate: false,
    noIgnoredQuotes: false,
  },
  authInfo: {},
  quotes: [],
  quickLinks: [
    {
      id: 'voz_living_f17',
      label: 'F17',
      link: 'https://forums.voz.vn/forumdisplay.php?f=17',
    },
    {
      id: 'voz_living_f33',
      label: 'F33',
      link: 'https://forums.voz.vn/forumdisplay.php?f=33',
    },
  ],
  followThreads: {},
  threadTracker: {},
  currentPost: {},
};

const defaultSyncStoreStructure = {
  savedPosts: {},
};

export default defaultStoreStructure;

const defaultSettingKeys = _.keys(defaultStoreStructure);

/* eslint-disable no-undef */
export const getChromeLocalStore = (
  keys = defaultSettingKeys,
  store = 'local',
  defaultStore = defaultStoreStructure
) => (
  new Promise(resolve => {
    chrome.storage[store].get(keys, items => {
      if (_.isEmpty(items)) {
        const result = { };
        let outKeys = keys;
        if (_.isString(outKeys)) {
          outKeys = [outKeys];
        }
        outKeys.forEach(key => {
          result[key] = defaultStore[key];
        });
        resolve(result);
      } else {
        const result = items;
        keys.forEach(key => {
          if (_.isUndefined(result[key])) {
            result[key] = defaultStore[key];
          }
        });
        resolve(result);
      }
    });
  })
);

// to fix the issue that setting is not generated as first load
export const getLocalSettings = () => {
  return getChromeLocalStore(['settings']).then(({ settings }) => {
    return {
      ...defaultStoreStructure.settings,
      ...settings,
    }
  })
}

export const setChromeLocalStore = (items, store = 'local') => (
  new Promise(resolve => {
    chrome.storage[store].set(items, () => resolve(true));
  })
);

export const getChromeSyncStore = (keys) => getChromeLocalStore(keys, 'sync', defaultSyncStoreStructure);
export const setChromeSyncStore = (items) => setChromeLocalStore(items, 'sync');
/* eslint-enable no-undef */