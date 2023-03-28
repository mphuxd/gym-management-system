import React from 'react';
import {
  CheckmarkFilled,
  CheckmarkOutlineError,
  CheckmarkOutlineWarning,
  MisuseOutline,
  Undefined,
  Unknown,
} from '@carbon/icons-react';
import styles from './Status.module.scss';

function Status({ status }) {
  const statusIconMap = {
    ACTIVE: <CheckmarkFilled className={styles.active} />,
    INACTIVE: <Undefined className={styles.undefined} />,
    LATE: <CheckmarkOutlineWarning className={styles.warning} />,
    CANCELLED: <CheckmarkOutlineError className={styles.error} />,
    BANNED: <MisuseOutline className={styles.misuse} />,
    default: <Unknown className={styles.unknown} />,
  };

  const icon = statusIconMap[status] || statusIconMap.default;
  return icon;
}

export default Status;

// @@@ update after check-in refactor
