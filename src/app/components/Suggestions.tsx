import Icon, {IconNames} from './Icon';
import Typography from './Typography';
import {Completeness, SuggestionTips} from './DateTime/types';

export type SuggestionsProps = {
  requiresSequential: boolean;
  completeness: Completeness;
  suggestions: SuggestionTips;
};

const getTips = (tips: string[], icon: IconNames, className?: string): JSX.Element[] => {
  return tips.map((tip, index) => (
    <div className={'flex items-center gap-0.5'} key={tip + index.toString()}>
      <Icon name={icon} className={className} />
      <Typography>{tip}</Typography>
    </div>
  ));
};

const Suggestions = ({suggestions: {allowed, notAllowed}, requiresSequential, completeness}: SuggestionsProps) => {
  return (
    <div className={'flex flex-col gap-2'}>
      <div className={'flex gap-0.5'}>
        <Typography mode="bold">Completeness:</Typography>
        <Typography>{completeness === Completeness.Full ? 'Full Entries only' : 'Partial Entry Allowed'}</Typography>
      </div>

      {completeness !== Completeness.Full && (
        <div className={'flex gap-0.5'}>
          <Typography mode="bold">Requires Sequential Entry:</Typography>
          <Typography>{requiresSequential ? 'Yes' : 'No'}</Typography>
        </div>
      )}

      <hr className={'border border-base-700'} />

      <Typography mode="bold">Examples:</Typography>

      <div className={'grid grid-flow-col gap-5'}>
        <div className={'flex flex-col gap-1.5'}>{getTips(allowed, 'check-circle', 'text-bright-green')}</div>
        <div className={'flex flex-col gap-1.5'}>
          {getTips(notAllowed, requiresSequential ? 'delete-rounded' : 'check-circle', requiresSequential ? '' : 'text-bright-green')}
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
