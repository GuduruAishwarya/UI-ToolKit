import type {TFunction} from 'i18next';
import Link from 'next/link';
import {twMerge} from 'tailwind-merge';

export type FooterProps = {
  translations?: TFunction<string, undefined>;
  className?: string;
};

const Footer = ({className, translations}: FooterProps) => {
  return (
    <div className={twMerge(`flex gap-2 items-center w-full justify-center underline-offset-4`, className)}>
      <Link
        href={process.env.NEXT_PUBLIC_PRIVACY_POLICY_LINK as string}
        className="text-secondary underline underline-offset-4"
        target="_blank">
        {translations?.('common.links.privacy') || 'Privacy Policy'}
      </Link>
      <Link
        href={process.env.NEXT_PUBLIC_COOKIE_POLICY_LINK as string}
        className="text-secondary underline underline-offset-4"
        target="_blank">
        {translations?.('common.links.cookie') || 'Cookie Policy'}
      </Link>
    </div>
  );
};
export default Footer;
