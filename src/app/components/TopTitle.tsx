import {twMerge} from 'tailwind-merge';

export default function TopTitle(props: {children: React.ReactNode; className?: string}) {
  return <div className={twMerge('text-4xl font-bold text-base-700  text-center', props.className)}>{props.children}</div>;
}
