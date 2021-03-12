import { Dispatch, FunctionComponent, SetStateAction } from 'react';
import * as dateFns from 'date-fns';
import { Button } from 'react-bootstrap';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import { CalendarViewTypes } from '../actions/types';

interface CalendarHeaderProps {
    currentDate: Date;
    setCurrentDate: Dispatch<SetStateAction<Date>>;
    view: CalendarViewTypes;
    setView: Dispatch<SetStateAction<CalendarViewTypes>>;
}

const CalendarHeader: FunctionComponent<CalendarHeaderProps> = ({
  currentDate, setCurrentDate, view, setView,
}) => {
  const nextWeek = () => {
    setCurrentDate(dateFns.addDays(currentDate, 7));
  };
  const previousWeek = () => {
    setCurrentDate(dateFns.subDays(currentDate, 7));
  };
  return (
    <div className="calendar-header">
      <Button className="calendar-header-button" onClick={(e) => previousWeek()}>
        <ChevronLeft />
      </Button>
      <h3>
        {dateFns.format(currentDate, 'MMMM yyyy')}
      </h3>
      <Button className="calendar-header-button" onClick={(e) => nextWeek()}>
        <ChevronRight />
      </Button>
    </div>
  );
};

export default CalendarHeader;
