import {ButtonProps} from '../Button';

export type SideHelpers = {
  label: string;
  identifier: number;
  onClick: () => void;
  shouldHide?: boolean;
} & ButtonProps;

export type FooterProps = {
  onDone: () => void;
  onCancel: () => void;
  onClear: () => void;
};

export type DateTimeCommonProps = {
  required?: boolean;
  errorMessage?: string;
  label: string;
  name?: string;
  requiresSequential?: boolean;
  completeness?: Completeness;
  placeholder?: string;
};

export enum Completeness {
  Partial = 'partial',
  Full = 'full',
}

export type SuggestionTips = {
  allowed: string[];
  notAllowed: string[];
};

export type DateType = {
  month: string;
  year: string;
  day: string;
};

export type NavigateDate = Omit<DateType, 'day'>;

export type DatePickerProps = {
  value?: DateType;
  disablePast?: boolean;
  disableFuture?: boolean;
  onDone: (date: DateType, errorMessage?: string, name?: string) => void;
  className?: string;
  enableRange?: {
    from?: DateType;
    to?: DateType;
  };
  placeHolder?: string;
} & DateTimeCommonProps;
