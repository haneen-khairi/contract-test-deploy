"use client"

import { useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface LocalizedLinkProps {
  locale: string;
  children: React.ReactNode;
}

const LocalizedLink: React.FC<LocalizedLinkProps> = ({ locale, children }) => {
  const currentLocale = useLocale();
  const path = usePathname();

  // Function to change the locale prefix in the path
  const changeLocale = (newLocale: string) => {
    const newPath = path.replace(`/${currentLocale}`, `/${newLocale}`);
    return newPath;
  };

  // Construct the new href with the updated locale
  const newHref = changeLocale(locale);

  return (
    <Link href={newHref} locale={false}>
      {children}
    </Link>
  );
}

export default LocalizedLink;
