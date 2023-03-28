import React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import styles from './Avatar.module.scss';

export const AVATAR_TEST_ID = 'avatarTestId';

const Avatar = React.forwardRef(
  ({ children, id, src, alt, ...props }, forwardedRef) => (
    <AvatarPrimitive.Root
      className={styles.AvatarRoot}
      ref={forwardedRef}
      {...props}
      data-testid={AVATAR_TEST_ID}
    >
      <AvatarPrimitive.Image
        className="rounded-full h-12 w-12"
        src={src}
        alt={alt}
      />
    </AvatarPrimitive.Root>
  )
);

Avatar.displayName = 'Avatar';
export default Avatar;
