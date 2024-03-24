'use client';
import NotificationRenderer from '@/components/NotificationRenderer';
import GlobalStore from '@/store/GlobalStore';
import NotificationStore from '@/store/NotificationStore';
import PlatformDataStore from '@/store/PlatformDataStore';
import UserStore from '@/store/UserStore';

import {createContext, useMemo} from 'react';
import GlobalStoresIdentifier from '@/utils/enums/store-identifier';

export const GlobalStoreContext = createContext({} as GlobalStore);

const createInitialBaseStores = () => {
  const globalStore = new GlobalStore();
  globalStore.addStoreToList(GlobalStoresIdentifier.NOTIFICATION_STORE, NotificationStore);
  const notificationStore = globalStore.getStore<NotificationStore>(GlobalStoresIdentifier.NOTIFICATION_STORE);
  globalStore.addStoreToList(GlobalStoresIdentifier.USER_STORE, UserStore, notificationStore);
  globalStore.addStoreToList(GlobalStoresIdentifier.PLATFORM_STORE, PlatformDataStore);
  return globalStore;
};
7;
const GlobalStoreProvider = ({children, locale}: {children: React.ReactNode; locale: string}) => {
  const baseStores = useMemo(() => {
    return createInitialBaseStores();
  }, []);

  return (
    <GlobalStoreContext.Provider value={baseStores}>
      <NotificationRenderer locale={locale} />
      {children}
    </GlobalStoreContext.Provider>
  );
};

export default GlobalStoreProvider;
