import type { InputHTMLAttributes } from 'react';
import { forwardRef, useRef, useImperativeHandle } from 'react';
import { twJoin } from 'tailwind-merge';

import { Input } from '@/components/Shadcn/input';
import searchIcon from '@/assets/icons/search.svg';

const SearchInput = forwardRef<
  HTMLInputElement | null,
  InputHTMLAttributes<HTMLInputElement> & {
    wrapperClass?: string;
    isError?: boolean;
  }
>(({ wrapperClass, isError, ...props }, ref) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
    ref,
    () => inputRef.current
  );

  const handleClickSearch = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className={twJoin(
        'flex border items-center justify-center rounded-md px-3 h-8 shadow',
        wrapperClass
      )}
    >
      <img
        src={searchIcon}
        width={20}
        height={20}
        onClick={handleClickSearch}
      />
      <Input
        {...props}
        ref={inputRef}
        className="border-none pl-1 focus:outline-none focus-visible:ring-0 shadow-none"
      ></Input>
    </div>
  );
});

SearchInput.displayName = 'SearchInput';

export default SearchInput;
