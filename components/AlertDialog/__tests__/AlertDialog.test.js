import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AlertDialog from '../AlertDialog';

describe('AlertDialog ', () => {
  it('should render "default" intent', async () => {
    // eslint-disable-next-line no-unused-vars
    render(
      <AlertDialog
        isOpen
        title="Test Alert Dialog title"
        description="Test Alert Dialog description"
        close="Alert Dialog Close"
        action="Alert Dialog Action"
        href="/"
      />
    );
    const alertDialog = await screen.findByRole('alertdialog');
    expect(alertDialog).toBeInTheDocument();
    expect(alertDialog).toMatchSnapshot();
  });

  it('should render "constrained" intent', async () => {
    render(
      <AlertDialog
        isOpen
        intent="constrained"
        actionPhrase="test action phrase"
        title="Test Alert Dialog title"
        description="Test Alert Dialog description"
        close="Alert Dialog Close"
        action="Alert Dialog Action"
        href="/"
      />
    );
    const alertDialog = await screen.findByRole('alertdialog');
    expect(alertDialog).toBeInTheDocument();
    expect(alertDialog).toMatchSnapshot();

    const input = await screen.findByPlaceholderText('test action phrase');
    expect(input).toBeInTheDocument();
    expect(input).toMatchSnapshot();
  });

  it(' in "constrained" intent, action button should be disabled by default', async () => {
    render(
      <AlertDialog
        isOpen
        intent="constrained"
        actionPhrase="test action phrase"
        title="Test Alert Dialog title"
        description="Test Alert Dialog description"
        close="Alert Dialog Close"
        action="Alert Dialog Action"
        href="/"
      />
    );
    const alertDialog = await screen.findByRole('alertdialog');
    expect(alertDialog).toBeInTheDocument();
    expect(alertDialog).toMatchSnapshot();

    const actionButton = await screen.findByText('Alert Dialog Action');
    expect(actionButton).toBeInTheDocument();
    expect(actionButton).toBeDisabled();
    expect(actionButton).toMatchSnapshot();
  });

  it(' in "constrained" intent, action button should be enabled when input value matches action text', async () => {
    render(
      <AlertDialog
        isOpen
        intent="constrained"
        actionPhrase="test action phrase"
        title="Test Alert Dialog title"
        description="Test Alert Dialog description"
        close="Alert Dialog Close"
        action="Alert Dialog Action"
        href="/"
      />
    );

    const input = await screen.findByPlaceholderText('test action phrase');
    expect(input).toBeInTheDocument();
    await userEvent.type(input, 'test action phrase');

    const actionButton = await screen.findByText('Alert Dialog Action');
    expect(actionButton).not.toBeDisabled();
    expect(actionButton).toMatchSnapshot();

    const alertDialog = await screen.findByRole('alertdialog');
    expect(alertDialog).toMatchSnapshot();
  });
});
