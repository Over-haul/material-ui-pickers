import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { SlideDirection } from './SlideTransition';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import { DateType } from '@date-io/type';
import { useUtils } from '../../_shared/hooks/useUtils';
import { MaterialUiPickersDate } from '../../typings/date';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { ArrowLeftIcon } from '../../_shared/icons/ArrowLeftIcon';
import { ArrowRightIcon } from '../../_shared/icons/ArrowRightIcon';

export interface CalendarHeaderProps {
  currentMonth: DateType;
  leftArrowIcon?: React.ReactNode;
  rightArrowIcon?: React.ReactNode;
  leftArrowButtonProps?: Partial<IconButtonProps>;
  rightArrowButtonProps?: Partial<IconButtonProps>;
  disablePrevMonth?: boolean;
  disableNextMonth?: boolean;
  slideDirection: SlideDirection;
  onMonthChange: (date: MaterialUiPickersDate, direction: SlideDirection) => void | Promise<void>;
}

export const useStyles = makeStyles(
  theme => ({
    switchHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: theme.spacing(0.5),
      marginBottom: theme.spacing(1),
    },
    transitionContainer: {
      width: '100%',
      overflow: 'hidden',
      height: 23,
    },
    iconButton: {
      zIndex: 1,
      backgroundColor: theme.palette.background.paper,
    },
    daysHeader: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      maxHeight: 16,
    },
    dayLabel: {
      width: 36,
      margin: '0 2px',
      textAlign: 'center',
      color: theme.palette.text.hint,
    },
  }),
  { name: 'MuiPickersCalendarHeader' }
);

const defProps = {
  leftArrowIcon: <ArrowLeftIcon />,
  rightArrowIcon: <ArrowRightIcon />,
  disablePrevMonth: false,
  disableNextMonth: false,
};

export const CalendarHeader: React.SFC<CalendarHeaderProps> = ({
  currentMonth,
  onMonthChange,
  leftArrowIcon = defProps.leftArrowIcon,
  rightArrowIcon = defProps.rightArrowIcon,
  leftArrowButtonProps,
  rightArrowButtonProps,
  disablePrevMonth = false,
  disableNextMonth = false,
  slideDirection,
}) => {
  const utils = useUtils();
  const classes = useStyles();
  const theme = useTheme();
  const rtl = theme.direction === 'rtl';

  const selectNextMonth = () => onMonthChange(utils.getNextMonth(currentMonth), 'left');
  const selectPreviousMonth = () => onMonthChange(utils.getPreviousMonth(currentMonth), 'right');

  return (
    <div>
      <div className={classes.switchHeader}>
        <IconButton
          {...leftArrowButtonProps}
          disabled={disablePrevMonth}
          onClick={selectPreviousMonth}
          className={classes.iconButton}
        >
          {rtl ? rightArrowIcon : leftArrowIcon}
        </IconButton>

        <div className={classes.transitionContainer}>
          <Typography align="center" variant="body1">
            {utils.getCalendarHeaderText(currentMonth)}
          </Typography>
        </div>

        <IconButton
          {...rightArrowButtonProps}
          disabled={disableNextMonth}
          onClick={selectNextMonth}
          className={classes.iconButton}
        >
          {rtl ? leftArrowIcon : rightArrowIcon}
        </IconButton>
      </div>

      <div className={classes.daysHeader}>
        {utils.getWeekdays().map((day, index) => (
          <Typography
            key={index} // eslint-disable-line react/no-array-index-key
            variant="caption"
            className={classes.dayLabel}
          >
            {day}
          </Typography>
        ))}
      </div>
    </div>
  );
};

CalendarHeader.displayName = 'CalendarHeader';

export default CalendarHeader;
