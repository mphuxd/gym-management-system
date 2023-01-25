import React from 'react';
import { render, screen } from '@testing-library/react';
import Avatar, { AVATAR_TEST_ID } from '../Avatar';

describe('Avatar ', () => {
  it('should match snapshot', async () => {
    const src = '/public/images/image-placeholder.png';
    const alt = 'placeholder alt';
    render(<Avatar src={src} alt={alt} />);

    const avatar = await screen.findByTestId(AVATAR_TEST_ID);
    expect(avatar).toMatchSnapshot();
  });
});
