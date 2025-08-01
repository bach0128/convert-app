import { Eye, EyeOff } from 'lucide-react';
import { forwardRef, useState } from 'react';

import { Input } from '@/components/Shadcn/input';
import { cn } from '@/lib/utils';

type BaseInputProps = React.ComponentProps<'input'> & {
  ref?: HTMLInputElement;
  isError?: boolean;
  errorClass?: string;
  isReadonly?: boolean;
};

const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  (
    {
      isError,
      errorClass = 'border-[#DF0000] focus:border-[#DF0000]',
      isReadonly,
      ...props
    },
    ref
  ) => {
    const isPassword = props.type === 'password';
    const [showPassword, setShowPassword] = useState(false);
    const inputClass = cn(
      'h-10 w-full rounded-lg border px-3 py-2 text-sm outline-none placeholder:text-[#838383] placeholder:font-normal focus:border-[#0D0D0D] focus:outline-none focus-visible:ring-0 disabled:text-[#D4D4D4]',
      isError && errorClass,
      props.className,
      isPassword && 'pr-8'
    );
    if (isPassword) {
      return (
        <div className="relative w-full">
          <Input
            {...props}
            ref={ref}
            className={inputClass}
            type={showPassword ? 'text' : 'password'}
          />
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={() => setShowPassword(!showPassword)}
            type="button"
          >
            {showPassword ? (
              <EyeOff className="size-4 text-gray-500 font-" />
            ) : (
              <Eye className="size-4 text-gray-500" />
            )}
          </button>
        </div>
      );
    }
    return (
      <Input
        {...props}
        ref={ref}
        className={cn(
          `${isReadonly ? 'bg-stone-100 text-gray-700' : ''}`,
          inputClass
        )}
        readOnly={Boolean(isReadonly)}
      />
    );
  }
);

BaseInput.displayName = 'BaseInput';

export default BaseInput;
