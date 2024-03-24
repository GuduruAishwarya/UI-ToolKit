import {twMerge} from 'tailwind-merge';
import Button from './Button';
import Icon from './Icon';

export default function ClipboardCopy({copyText, className}: {copyText: string; className?: string}) {
  return (
    <Button
      variant="none"
      onClick={() => navigator.clipboard.writeText(copyText)}
      className={twMerge('min-w-[unset] p-0 border-none bg-transparent', className)}>
      <Icon name="clipboard-copy" className="text-secondary" />
    </Button>
  );
}
