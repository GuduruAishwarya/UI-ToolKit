'use client';
import PopOver, {PopOverProps} from '@/components/PopOver';
import Tooltip from '@/components/Tooltip';
import {useGlobalBaseComponentContext} from '@/utils/hooks/useGlobalBaseComponentContext';

import {GlobalTooltipProps} from '@/utils/index';

const GlobalComponent = () => {
  const {
    globalBaseComponentContext: {popOver = {} as PopOverProps, tooltip = {} as GlobalTooltipProps},
  } = useGlobalBaseComponentContext();
  return (
    <>
      {tooltip.isOpen && (
        <Tooltip
          fromRoot
          atElement={tooltip.atElement}
          content={tooltip.content}
          className={tooltip.className}
          renderAt={tooltip.renderAt}
          toLeft={tooltip.toLeft}
          styles={tooltip.styles}
        />
      )}

      {popOver.isPopOverOpen && (
        <PopOver
          isPopOverOpen={popOver.isPopOverOpen}
          atElement={popOver.atElement}
          shouldCloseOnOutsideClick={popOver.shouldCloseOnOutsideClick}
          onClose={popOver.onClose}
          moveLeftBy={popOver.moveLeftBy}
          className={popOver.className}
          fromRoot
          popupStyle={popOver.popupStyle}
          overrideMaxWidth={popOver.overrideMaxWidth}>
          {popOver.children}
        </PopOver>
      )}
    </>
  );
};

export default GlobalComponent;
