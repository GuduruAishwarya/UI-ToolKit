'use client';
import {useContext} from 'react';

import {GlobalBaseComponentsContexts} from '@/utils/GlobalBaseComponentContextWrapper';

export function useGlobalBaseComponentContext() {
  return useContext(GlobalBaseComponentsContexts);
}
