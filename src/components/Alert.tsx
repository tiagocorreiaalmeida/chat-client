import React from 'react';
import { SnackbarContent, makeStyles, Theme } from '@material-ui/core';
import { WarningRounded, InfoRounded, CheckCircleRounded } from '@material-ui/icons';

const userAlertStyles = makeStyles((theme: Theme) => ({
  success: {
    backgroundColor: theme.palette.success.light,
  },
  error: {
    backgroundColor: theme.palette.error.light,
  },
  info: {
    backgroundColor: theme.palette.info.light,
  },
  icon: {
    marginRight: '10px',
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
  },
}));

const variantIcon = {
  success: CheckCircleRounded,
  error: WarningRounded,
  info: InfoRounded,
};

interface AlertProps {
  message: string;
  variant: keyof typeof variantIcon;
}

export const Alert: React.FC<AlertProps> = ({ message, variant }: AlertProps) => {
  const classes = userAlertStyles();
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={(classes.container, classes[variant])}
      message={
        <div className={classes.message}>
          <Icon className={classes.icon} />
          {message}
        </div>
      }
    />
  );
};
