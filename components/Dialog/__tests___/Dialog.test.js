import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dialog from '../Dialog';
import DialogContent from '../DialogContent';
import DialogClose from '../DialogClose';
import DialogTitle from '../DialogTitle';

describe('Dialog: ', () => {
  it('should match snapshot', async () => {
    render(
      <div>
        <Dialog trigger="Trigger">
          <DialogContent>
            <DialogTitle>Test Dialog</DialogTitle>
            <DialogClose />
          </DialogContent>
        </Dialog>
      </div>
    );

    const trigger = await screen.findByText('Trigger');
    await userEvent.click(trigger);
    const dialog = await screen.findByRole('dialog');
    expect(dialog).toMatchSnapshot();
  });
});
