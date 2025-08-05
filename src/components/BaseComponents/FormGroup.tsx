import { useId, type PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

type FormGroupProps = {
  errorMsg?: string | string[] | undefined;
  label?: string;
  wrapperClass?: string;
  childrenClass?: string;
  isWrappedByLabel?: boolean;
  labelClass?: string;
  isRequrired?: boolean;
};

function FormGroup({
  children,
  errorMsg,
  label,
  wrapperClass = 'space-y-1 text-left',
  labelClass = '',
  childrenClass,
  isWrappedByLabel = true,
  isRequrired = false,
}: PropsWithChildren<FormGroupProps>) {
  const WrapTag = isWrappedByLabel ? 'label' : 'div';
  const id = useId();
  return (
    <div className={cn(wrapperClass)}>
      <WrapTag>
        {label && (
          <span
            className={cn(
              'mb-1 font-medium text-[16px] leading-[22px]',
              labelClass
            )}
          >
            {label}
            {isRequrired && <span className="text-red-500"> *</span>}
          </span>
        )}
        <div className={cn('mt-1', childrenClass)}>{children}</div>
      </WrapTag>
      {errorMsg &&
        (typeof errorMsg == 'string' ? (
          <span className="mt-1 text-xs font-normal text-[#DF0000]">
            {errorMsg}
          </span>
        ) : (
          <>
            {errorMsg.map((error) => (
              <span
                className="mt-1 text-xs font-normal text-[#DF0000]"
                key={error + id}
              >
                {error}
              </span>
            ))}
          </>
        ))}
    </div>
  );
}

export default FormGroup;
