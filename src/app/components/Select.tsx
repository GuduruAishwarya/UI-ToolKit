'use client';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {twMerge} from 'tailwind-merge';

import Button from '@/components/Button';
import PopOver from '@/components/PopOver';
import Text from '@/components/Text';
import Typography from '@/components/Typography';
import Icon from '@/components/Icon';

import type {TextProps} from './Text';
import {IconVariants} from '@/components/Icon';

export type SelectProps = {
  label: string;
  required?: boolean;
  placeholder?: string;
  errorMessage?: string;
  options?: SelectOption[];
  headerElement?: JSX.Element;
  name: string;
  onSelectChange?: (option: SelectChange) => void;
  hideChevron?: boolean;
  emptyValueText?: string;
  displayText?: string | JSX.Element;
  shouldDisplayText?: boolean;
  includeSearch?: boolean;
  searchPlaceholder?: string;
  includeDeleteSelected?: boolean;
  className?: string;
  title?: string;
  prefixIcon?: JSX.Element | string;
  textInputStyles?: {input?: string};
  styles?: {
    optionsWrapper?: string;
    inputWrapper?: string;
    selectWrapper?: string;
    searchTextContainer?: string;
    chevronStyle?: string;
    displayWrapper?: string;
  };
  isGroupedOptions?: boolean;
  groupedOption?: GroupedSelection[];
} & TextProps;

export type SelectOption = {
  value: string | number | undefined;
  label?: string;
  renderHTML?: React.JSX.Element | undefined;
  className?: string;
  searchTerms?: string[];
};

export type SelectChange = {
  name: string;
  option: SelectOption;
};

export type GroupedSelection = {
  options: SelectOption[];
  groupedBy: string;
  className?: string;
};

const getFilteredOptions = (options: SelectOption[], searchTerm: string) => {
  const filteredOptions = options?.filter((x) => {
    if (x.label?.toLowerCase().includes(searchTerm.toLowerCase())) {
      return true;
    }
    if (x.searchTerms) {
      for (let i = 0; i < x.searchTerms?.length; i++) {
        if (x.searchTerms[i].toLowerCase().includes(searchTerm.toLowerCase())) {
          return true;
        }
      }
    }
    return false;
  });
  return filteredOptions;
};

const Select = ({
  label,
  required,
  placeholder,
  disabled,
  value,
  headerElement,
  errorMessage,
  options,
  onSelectChange,
  hideChevron = false,
  name,
  emptyValueText,
  displayText,
  readOnly,
  shouldDisplayText,
  includeSearch,
  searchPlaceholder,
  includeDeleteSelected,
  title,
  className,
  isGroupedOptions,
  groupedOption,
  prefixIcon,
  styles: {optionsWrapper, inputWrapper, selectWrapper, searchTextContainer, chevronStyle, displayWrapper} = {},
  textInputStyles: {input} = {},
}: SelectProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const [inputValue, setInputValue] = useState<string | JSX.Element>('');
  const refElement = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(value);
  const [search, setSearch] = useState('');
  const [renderHTML, setRenderHTML] = useState<JSX.Element | null>();
  const searchRef = useRef<HTMLInputElement>(null);
  const onPopoverClose = useCallback(() => {
    setShowOptions(false);
  }, []);

  useEffect(() => {
    if (!showOptions) {
      setSearch('');
    }
  }, [showOptions]);
  useEffect(() => {
    if (shouldDisplayText) {
      setInputValue(displayText || '');
      setRenderHTML(displayText as JSX.Element);
    } else {
      let opts: SelectOption[] | undefined = options;
      if (isGroupedOptions) {
        opts = [];
        groupedOption?.forEach((grp) => {
          opts?.push(...grp.options);
        });
      }

      const option = opts?.find((x) => x?.value === value);
      setInputValue(option?.label || emptyValueText || '');

      setRenderHTML(option?.renderHTML ? <div className="text-base-700"> {option?.renderHTML}</div> : null);
    }
    setSelected(value);
  }, [value, options, emptyValueText, displayText, shouldDisplayText, isGroupedOptions, groupedOption, selected]);

  const handleChange = useCallback(
    (option: SelectOption) => {
      setShowOptions(false);
      setSearch('');
      setSelected(option.value);
      onSelectChange?.({name, option});
      if (!shouldDisplayText) {
        option.label && setInputValue(option.label);
        option.renderHTML && setRenderHTML(option.renderHTML);
      }
    },
    [name, onSelectChange, shouldDisplayText],
  );

  useEffect(() => {
    if (showOptions && includeSearch) {
      setTimeout(() => {
        searchRef.current?.focus();
      }, 100);
    }
  }, [showOptions, includeSearch]);

  const clearSelection = useCallback(() => {
    setSelected('');
    setInputValue('');
    setSearch('');
    onSelectChange?.({name, option: {value: ''}} as SelectChange);
  }, [name, onSelectChange]);

  const filteredOptions = useMemo(() => {
    if (!search) {
      return groupedOption || options;
    } else {
      const filtered = !isGroupedOptions
        ? getFilteredOptions(options || [], search)
        : (() => {
            const constructedOptions: GroupedSelection[] = [];
            groupedOption?.forEach((grp) => {
              const options = getFilteredOptions(grp.options, search);
              if (options.length) {
                constructedOptions.push({groupedBy: grp.groupedBy, options});
              }
            });
            return constructedOptions;
          })();
      return filtered;
    }
  }, [groupedOption, isGroupedOptions, options, search]);

  const getOptions = useCallback(
    () => (
      <div className={'overflow-auto last:pb-[10px] first:pt-[10px]'}>
        {isGroupedOptions ? (
          (filteredOptions as GroupedSelection[])?.map((option: GroupedSelection, index: number) => {
            const showSeparator =
              groupedOption && index < groupedOption?.length - 1 && (filteredOptions?.[index + 1] as GroupedSelection)?.options?.length > 0;
            return (
              <div key={option.groupedBy} className="flex flex-col gap-[1px]">
                {option.groupedBy && (
                  <Typography mode="bolder" className="pt-3 pb-2 px-2 text-base-500">
                    {option.groupedBy}
                  </Typography>
                )}
                {option.options?.map((option) => {
                  return (
                    <div
                      key={option.value}
                      className={twMerge('px-[10px] py-0 relative cursor-pointer')}
                      onClick={() => handleChange(option)}>
                      <div
                        className={twMerge(
                          'p-2 flex gap-1 hover:bg-primary-low-contrast hover:rounded-lg hover:text-primary-high-contrast ',
                          option?.value === selected && 'bg-primary-low-contrast rounded-lg text-primary-high-contrast',
                          option.className,
                        )}>
                        <Typography overrideBase={option.value === selected} className={'flex gap-1 w-max items-center'}>
                          {option.renderHTML || option.label}
                        </Typography>
                      </div>
                      <div className={option?.value === selected ? 'absolute bg-primary w-1 h-[90%] top-[5%] left-0 rounded-r' : ''}></div>
                    </div>
                  );
                })}
                {showSeparator && (
                  <div className="p-2">
                    <hr />
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <>
            {(filteredOptions as SelectOption[])?.map((option) => (
              <div key={option?.value} className={twMerge('px-[10px] py-0 relative cursor-pointer')} onClick={() => handleChange(option)}>
                <div
                  className={twMerge(
                    'py-[10px] px-[6px] flex gap-1 hover:bg-primary-low-contrast rounded-lg hover:text-primary-high-contrast text-base-700',
                    option?.value === selected && 'bg-primary-low-contrast',
                  )}>
                  <Typography
                    overrideBase={option.value === selected}
                    className={`flex gap-1 w-max items-center hover:text-primary-high-contrast ${
                      option?.value === selected ? 'text-primary-high-contrast' : ''
                    }`}>
                    {option?.renderHTML || option?.label}
                  </Typography>
                </div>
                <div className={option?.value === selected ? 'absolute bg-primary w-1 h-[90%] top-[5%] left-0 rounded-r' : ''}></div>
              </div>
            ))}
          </>
        )}
      </div>
    ),
    [filteredOptions, groupedOption, handleChange, isGroupedOptions, selected],
  );

  return (
    <div className={twMerge('flex flex-col ', className)}>
      {label && <Typography mode="bolder" className="text-base-700 text-sm">{`${label} ${required ? '*' : ''}`}</Typography>}
      <div className={twMerge('flex flex-col ', selectWrapper)}>
        <div
          ref={refElement}
          className={twMerge(
            'flex p-2 gap-2 items-center rounded-md border border-base-300 relative align-center cursor-pointer',
            inputWrapper,
          )}
          onClick={() => !readOnly && setShowOptions(!showOptions)}>
          {renderHTML && <div className={twMerge('flex py-[2px] grow items-center gap-2', displayWrapper)}>{renderHTML}</div>}
          {prefixIcon ? typeof prefixIcon === 'string' ? <Icon name={prefixIcon} /> : prefixIcon : ''}
          {!renderHTML && (
            <input
              autoComplete="new-off"
              placeholder={placeholder}
              readOnly
              disabled={disabled}
              className={twMerge('border-none outline-none bg-inherit cursor-pointer flex-grow text-base-700', input)}
              value={(inputValue as string) || placeholder}
            />
          )}
          {!hideChevron && <Icon name="chevron-down" variant={IconVariants.SMALL} className={twMerge('text-secondary', chevronStyle)} />}
        </div>
        {errorMessage && <Typography className={'text-red-high-contrast text-xs'}>{errorMessage}</Typography>}

        <div className={'relative -top-2'}>
          <PopOver className="z-[43]" isPopOverOpen={showOptions} atElement={refElement} onClose={onPopoverClose}>
            <div
              className={twMerge(
                'absolute flex flex-col top-0 z-10 w-full max-h-[400px] bg-base-color rounded-md border border-base-300',
                optionsWrapper,
              )}>
              {(title || includeDeleteSelected) && (
                <div className={'flex justify-between py-3 px-4 items-center'}>
                  <Typography mode="bolder" className={'grow'}>
                    {title}
                  </Typography>
                  {includeDeleteSelected && (
                    <Button className={'min-w-0 p-0'} variant="none" onClick={() => clearSelection()}>
                      <Icon name="delete" />
                    </Button>
                  )}
                </div>
              )}
              {headerElement}
              {includeSearch && (
                <div
                  className={
                    'min-h-[40px] flex gap-[6px] items-center border border-base-300 m-2 px-[10px] rounded-[50px] overflow-hidden'
                  }>
                  <Icon name="search" variant={IconVariants.LARGE} className="text-base-700" />
                  <Text
                    label=""
                    className={twMerge('min-h-0 grow', searchTextContainer)}
                    placeholder={searchPlaceholder || 'Search'}
                    styles={{
                      input: 'min-h-0 cursor-pointer',
                      inputWrapper: 'border-none',
                    }}
                    ref={searchRef}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              )}
              {getOptions()}
            </div>
          </PopOver>
        </div>
      </div>
    </div>
  );
};

export default Select;
