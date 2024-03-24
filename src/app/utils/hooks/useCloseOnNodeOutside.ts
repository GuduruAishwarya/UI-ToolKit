import {useEffect} from 'react';

export function useCloseOnNodeOutsideClick(
  node: React.MutableRefObject<HTMLElement | null>,
  outclickAction: () => void,
  openNode: boolean,
) {
  useEffect(() => {
    const listen = (event: MouseEvent) => {
      if (node.current && openNode) {
        if (!node.current.contains(event.target as Node)) {
          outclickAction();
        }
      }
    };
    document.addEventListener('mousedown', listen);

    return () => {
      document.removeEventListener('mousedown', listen);
    };
  }, [node, openNode, outclickAction]);
}
