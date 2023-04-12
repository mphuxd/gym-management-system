import React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';

export const AVATAR_TEST_ID = 'avatarTestId';

type AvatarRef = React.ElementRef<typeof AvatarPrimitive.Root>;
export interface AvatarProps extends AvatarPrimitive.AvatarProps {
  id?: string;
  src: string;
  alt: string;
}

const Avatar = React.forwardRef<AvatarRef, AvatarProps>(
  ({ children, id, src, alt, ...props }, forwardedRef) => (
    <AvatarPrimitive.Root
      id={id}
      className="inline-flex h-12 w-12 select-none items-center justify-center overflow-hidden rounded-full align-middle"
      ref={forwardedRef}
      {...props}
      data-testid={AVATAR_TEST_ID}
    >
      <AvatarPrimitive.Image
        className="h-12 w-12 rounded-full"
        src={src}
        alt={alt}
      />
    </AvatarPrimitive.Root>
  )
);

Avatar.displayName = 'Avatar';
export default Avatar;
