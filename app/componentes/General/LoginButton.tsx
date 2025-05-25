import { SignInButton } from '@clerk/clerk-react';
import React from 'react'
import { buttonVariantsRecord, type GenericButtonProps } from '~/interfaces';
import { Icon } from './Icon';

export const LoginButton = ({
  text,
  buttonVariant,
  iconName,
  onClickHandler,
}: GenericButtonProps) => {
  return (
    <SignInButton>
      <button
        className={`cursor-pointer rounded-[20px] border-2 px-6 py-2 transition ${buttonVariantsRecord[buttonVariant]}`}
        onClick={onClickHandler}
        >
        {iconName && <Icon iconName={iconName} margin_right={10} />}
        <span className="">{text}</span>
      </button>
     </SignInButton>
  );
};