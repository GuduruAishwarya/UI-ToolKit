import {useState} from 'react';
import Typography from '@/components/Typography';
import type {ButtonProps} from '@/components/Button';
import Button from '@/components/Button';
import {twMerge} from 'tailwind-merge';
import type {IconProps} from './Icon';
import Icon from './Icon';

type TabProps = {
  tabs: Tabs[];
  activeTab?: string;
  styles: {
    container: string;
    tabsWrapper: string;
    selectedStyles: string;
  };
};

type Tabs = {
  text: string;
  icon?: IconProps;
  content: JSX.Element;
  identifier: string;
  tabProps?: ButtonProps;
};

const Tabs = ({tabs, activeTab, styles: {container, tabsWrapper, selectedStyles}}: TabProps) => {
  const [currentActiveTab, setCurrentActiveTab] = useState(activeTab || tabs[0]?.identifier);

  return (
    <>
      <div className={twMerge('flex flex-col gap-2', container)}>
        <div className={twMerge('border flex gap-6 justify-center relative p-[1px] ', tabsWrapper)}>
          {tabs.map(({text, icon, identifier, tabProps}) => {
            const {onClick, className, ...rest} = tabProps || ({} as ButtonProps);
            return (
              <div key={identifier} className="relative">
                <Button
                  variant="none"
                  className={twMerge(
                    identifier === currentActiveTab ? 'text-primary' : 'text-base-700',
                    'text-xs p-0 pt-1 min-w-[unset]',
                    className,
                  )}
                  onClick={(e) => {
                    setCurrentActiveTab(identifier);
                    onClick?.(e);
                  }}
                  {...rest}>
                  <div>
                    <div className="flex py-1.5 gap-1 items-center justify-center">
                      {icon && (
                        <Icon
                          {...icon}
                          className={twMerge(
                            currentActiveTab === identifier ? selectedStyles : 'fill-base-700 text-base-700 stroke-base-700',
                            icon.className,
                          )}
                        />
                      )}
                      <Typography className={identifier === currentActiveTab ? 'text-primary ' : ''}>{text}</Typography>
                    </div>
                    {currentActiveTab === identifier && <div className="h-1 rounded-lg bg-primary"></div>}
                  </div>
                </Button>
              </div>
            );
          })}
        </div>
        {tabs.find((x) => x.identifier === currentActiveTab)?.content || ''}
      </div>
    </>
  );
};

export default Tabs;
