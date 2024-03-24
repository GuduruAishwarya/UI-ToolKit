'use client';

import type {PropsWithChildren} from 'react';
import {useEffect, useState} from 'react';

export default function ServerDisableHydration({children}: PropsWithChildren) {
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    setRendered(true);
  }, []);
  if (!rendered) return null;
  return <>{children}</>;
}
