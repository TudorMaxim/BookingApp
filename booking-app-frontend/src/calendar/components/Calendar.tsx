import { FunctionComponent, useState } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarWeeklyView from './CalendarWeeklyView';
import { CalendarViewTypes } from '../actions/types';
import '../styles/Calendar.sass';

const Calendar: FunctionComponent = () => {
  const [view, setView] = useState(CalendarViewTypes.WEEK);
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div className="bookings-calendar">
      <CalendarHeader
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        view={view}
        setView={setView}
      />
      { view === CalendarViewTypes.WEEK
        && <CalendarWeeklyView currentDate={currentDate} />}
    </div>
  );
};

export default Calendar;
