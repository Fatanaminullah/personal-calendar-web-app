import {Col, Row} from 'antd';
import moment from 'moment';
import React from 'react';
import {DashboardBackground} from '../../assets';
import {colors} from '../../utilities';

const LoginPage = () => {
  const daysHeader = () => {
    return moment.weekdaysShort().map((day) => (
      <th key={day} className="days-header">
        {day}
      </th>
    ));
  };
  const firstDayOfMonth = () => {
    let dateObject = moment();
    return moment(dateObject).startOf('month').format('d');
  };
  const renderDay = () => {
    const before = [];
    const lastDayOfPreviousMonth = moment()
      .subtract(1, 'months')
      .endOf('month')
      .format('D');
    const firstCell = moment()
      .startOf('month')
      .subtract(firstDayOfMonth(), 'day')
      .format('D');
    for (let i = lastDayOfPreviousMonth; i >= firstCell; i--) {
      before.push(<td className="days-body before">{i}</td>);
    }
    const after = [];
    const endOfWeek = moment().endOf('week').format('d');
    const endOfMonth = moment().endOf('month').format('d');
    for (let j = 1; j <= endOfWeek - endOfMonth; j++) {
      after.push(<td className="days-body after">{j}</td>);
    }
    const days = [];
    for (let k = 1; k <= moment().daysInMonth(); k++) {
      days.push(
        <td key={k} className="days-body">
          {k}
        </td>,
      );
    }
    const totalSlots = [...before, ...days, ...after];
    let rows = [];
    let cells = [];
    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        rows.push(cells);
      }
    });
    const daysInMonth = rows.map((d, i) => {
      return <tr>{d}</tr>;
    });
    return daysInMonth;
  };
  return (
    <>
      <Row>
        <Col span={24}>
          <div
            style={{
              backgroundImage: `url(${DashboardBackground})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              height: '100vh',
              margin: 0,
              display: 'flex',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <div
              style={{
                backgroundColor: colors.white,
                borderRadius: 10,
                alignSelf: 'center',
                padding: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                width: '70%',
              }}>
              <h2 style={{margin: '10px 0'}}>Your Personal Calendar</h2>
              <table>
                <thead>
                  <tr>{daysHeader()}</tr>
                </thead>
                <tbody>{renderDay()}</tbody>
              </table>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default LoginPage;
