import { FunctionComponent, MutableRefObject } from 'react';
import { WeeklyCell, WeeklyCellTypes } from '../../utils/calendar';

interface CalendarWeeklyCellProps {
    cell: WeeklyCell;
    topLeftCellRef: MutableRefObject<HTMLDivElement | null>;
}

const CalendarWeeklyCell: FunctionComponent<CalendarWeeklyCellProps> = ({
  cell, topLeftCellRef, children,
}) => {
  const { type, current } = cell;
  let className = 'calendar-week-cell';
  if ([WeeklyCellTypes.DAYS, WeeklyCellTypes.HOURS].includes(type)) {
    className += ' calendar-week-cell-bold';
  }
  if (current) {
    className += ' calendar-week-current-day';
  }
  if (type === WeeklyCellTypes.TOP_LEFT) {
    return (
      <div ref={topLeftCellRef} className={className}>
        {children}
      </div>
    );
  }
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default CalendarWeeklyCell;
