import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import App from './App';
import Header from './components/header';
import EventDetails, {getDetailDateTimeDisplay} from './components/sidebar/eventDetails';

describe('Basic App Test', function () {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('Header Tests', function () {
  it('moves to the next month', () => {
    const div = document.createElement('div');
    const header = ReactDOM.render(
      <Header
        month={5}
        day={14}
        year={2019}
        resolution={"month"}
        panelOpen={false}
        onChangeDate={() => null}
        onTogglePanel={() => null}
        onUpdateResolution={() => null}
        momentizedDate={moment(['2019', '5', '14'])}
      />, div);

    expect(header.getDateParams(6).month).toBe(6);
  })

  it('moves to the previous month', () => {
    const div = document.createElement('div');
    const header = ReactDOM.render(
      <Header
        month={5}
        day={14}
        year={2019}
        resolution={"month"}
        panelOpen={false}
        onChangeDate={() => null}
        onTogglePanel={() => null}
        onUpdateResolution={() => null}
        momentizedDate={moment(['2019', '5', '14'])}
      />, div);

    expect(header.getDateParams(4).month).toBe(4);
  })


  it('moves to the next day', () => {
    const div = document.createElement('div');
    const header = ReactDOM.render(
      <Header
        month={5}
        day={14}
        year={2019}
        resolution={"day"}
        panelOpen={false}
        onChangeDate={() => null}
        onTogglePanel={() => null}
        onUpdateResolution={() => null}
        momentizedDate={moment(['2019', '5', '14'])}
      />, div);

    expect(header.getDateParams(15).day).toBe(15);
  })

  it('moves to the previous month in dayview', () => {
    const div = document.createElement('div');
    const header = ReactDOM.render(
      <Header
        month={4}
        day={1}
        year={2019}
        resolution={"day"}
        panelOpen={false}
        onChangeDate={() => null}
        onTogglePanel={() => null}
        onUpdateResolution={() => null}
        momentizedDate={moment(['2019', '4', '1'])}
      />, div);

    expect(header.getDateParams(0).day).toBe(30);
    expect(header.getDateParams(0).month).toBe(3);
  })

  it('moves to the previous month in monthview', () => {
    const div = document.createElement('div');
    const header = ReactDOM.render(
      <Header
        month={4}
        day={1}
        year={2019}
        resolution={"month"}
        panelOpen={false}
        onChangeDate={() => null}
        onTogglePanel={() => null}
        onUpdateResolution={() => null}
        momentizedDate={moment(['2019', '4', '1'])}
      />, div);

    expect(header.getDateParams(3).day).toBe(1);
    expect(header.getDateParams(3).month).toBe(3);
  })

  it('moves to the previous day', () => {
    const div = document.createElement('div');
    const header = ReactDOM.render(
      <Header
        month={5}
        day={14}
        year={2019}
        resolution={"day"}
        panelOpen={false}
        onChangeDate={() => null}
        onTogglePanel={() => null}
        onUpdateResolution={() => null}
        momentizedDate={moment(['2019', '5', '14'])}
      />, div);

    expect(header.getDateParams(13).day).toBe(13);
  })


  it('deals correctly with year change with month', () => {
    const div = document.createElement('div');
    const header = ReactDOM.render(
      <Header
        month={11}
        day={31}
        year={2019}
        resolution={"month"}
        panelOpen={false}
        onChangeDate={() => null}
        onTogglePanel={() => null}
        onUpdateResolution={() => null}
        momentizedDate={moment(['2019', '11', '31'])}
      />, div);

    expect(header.getDateParams(12).month).toBe(0);
    expect(header.getDateParams(12).year).toBe(2020);
    expect(header.getDateParams(12).day).toBe(1);
  });

  it('deals correctly with year change with day', () => {
    const div = document.createElement('div');
    const header = ReactDOM.render(
      <Header
        month={11}
        day={31}
        year={2019}
        resolution={"day"}
        panelOpen={false}
        onChangeDate={() => null}
        onTogglePanel={() => null}
        onUpdateResolution={() => null}
        momentizedDate={moment(['2019', '11', '31'])}
      />, div);

    expect(header.getDateParams(32).month).toBe(0);
    expect(header.getDateParams(32).year).toBe(2020);
    expect(header.getDateParams(32).day).toBe(1);
  });
});

describe('EventDetails tests', function () {
  it('renders without panel users', () => {
    const div = document.createElement('div');
    const event = {
      id: "1db9b713-2d1c-4a73-b3c1-9975c3135445",
      title: "illum error iusto",
      description: "Omnis ipsam culpa deleniti. Beatae libero tenetur sed rerum quo et cum. Exercitationem est excepturi consequatur distinctio cum dolor. Molestiae amet eum a odit et voluptates. Error neque nisi sed incidunt.",
      startDate: "2018-05-09T06:30:00.000Z",
      endDate: "2018-05-09T16:30:00.000Z",
      userIds: [
        "95d2c410-2eb4-4a53-8f0c-a51fc072438a"
      ]
    };

    new EventDetails({panelEvent: event});
  });

  it('renders with empty panel users', () => {
    const div = document.createElement('div');
    const event = {
      id: "1db9b713-2d1c-4a73-b3c1-9975c3135445",
      title: "illum error iusto",
      description: "Omnis ipsam culpa deleniti. Beatae libero tenetur sed rerum quo et cum. Exercitationem est excepturi consequatur distinctio cum dolor. Molestiae amet eum a odit et voluptates. Error neque nisi sed incidunt.",
      startDate: "2018-05-09T06:30:00.000Z",
      endDate: "2018-05-09T16:30:00.000Z",
      userIds: [
        "95d2c410-2eb4-4a53-8f0c-a51fc072438a"
      ]
    };

    new EventDetails({panelEvent: event, panelUsers: []});
  });

  it('renders with panel users', () => {
    const div = document.createElement('div');
    const event = {
      id: "1db9b713-2d1c-4a73-b3c1-9975c3135445",
      title: "illum error iusto",
      description: "Omnis ipsam culpa deleniti. Beatae libero tenetur sed rerum quo et cum. Exercitationem est excepturi consequatur distinctio cum dolor. Molestiae amet eum a odit et voluptates. Error neque nisi sed incidunt.",
      startDate: "2018-05-09T06:30:00.000Z",
      endDate: "2018-05-09T16:30:00.000Z",
      userIds: [
        "95d2c410-2eb4-4a53-8f0c-a51fc072438a"
      ]
    };

    new EventDetails({panelEvent: event, panelUsers: [{name: 123}, {name: 56}]});
  });

  it('formats date/time correctly for same day', () => {
    const div = document.createElement('div');

    const startDate = "2018-05-09T06:30:00.000Z";
    const endDate = "2018-05-09T16:30:00.000Z";

    expect(getDetailDateTimeDisplay(startDate, endDate)).toBe("Wednesday May 9th, 2018 6:05am - 4:05pm");
  });


  it('formats date/time correctly for multiple days', () => {
    const div = document.createElement('div');

    const startDate = "2018-05-09T06:30:00.000Z";
    const endDate = "2018-05-10T16:30:00.000Z";

    expect(getDetailDateTimeDisplay(startDate, endDate)).toBe("Wednesday May 9th, 2018 12:05am - Thursday May 10th, 2018 4:05pm");
  });

  it('formats date/time correctly for empty dates', () => {
    const div = document.createElement('div');

    const startDate = "";
    const endDate = "";

    expect(getDetailDateTimeDisplay(startDate, endDate)).toBe("");
  });

});

