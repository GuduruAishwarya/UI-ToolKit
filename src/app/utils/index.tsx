import {PopOverProps} from '@/components/PopOver';
import {TooltipProps} from '@/components/Tooltip';

import GlobalBaseComponentContextWrapper from '@/utils/GlobalBaseComponentContextWrapper';

export type GlobalTooltipProps = {
  isOpen: boolean;
} & TooltipProps;

export type GlobalBaseComponentsContext = {
  popOver?: PopOverProps & {id: string};
  tooltip?: GlobalTooltipProps;
};

export type GlobalBaseComponentsContextProp = {
  globalBaseComponentContext: GlobalBaseComponentsContext;
  setGlobalBaseComponentContext: React.Dispatch<React.SetStateAction<GlobalBaseComponentsContext>>;
};

export const defaultGlobalContext: GlobalBaseComponentsContext = {
  popOver: {
    isPopOverOpen: false,
    atElement: null,
    children: <></>,
    onClose: undefined,
    fromRoot: undefined,
    shouldCloseOnOutsideClick: true,
    className: undefined,
    popupStyle: undefined,
    moveLeftBy: undefined,
    id: '',
  },
  tooltip: {
    fromRoot: false,
    atElement: null,
    content: '',
    className: undefined,
    isOpen: false,
    renderAt: undefined,
    toLeft: undefined,
    styles: {contentWrapperClass: undefined, topArrow: undefined, bottomArrow: undefined},
  },
};

export default GlobalBaseComponentContextWrapper;
