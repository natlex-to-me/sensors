import { msInSecond } from '../constants/ms-in-second';
import { resetTimeForDate, unixTimeToDate } from './date-helpers';

describe('DateHelper', () => {
  tests();
});

function tests() {
  const unixTime = 123;

  it('can convert unix time to date', () => {
    const date = unixTimeToDate(unixTime);

    expect(date).toEqual(new Date(unixTime * msInSecond));
  });

  it('can get date without time', () => {
    const date = resetTimeForDate(new Date());

    expect(date.getHours()).toEqual(0);
    expect(date.getMinutes()).toEqual(0);
    expect(date.getSeconds()).toEqual(0);
    expect(date.getMilliseconds()).toEqual(0);

    expect(date.getFullYear()).not.toEqual(0);
    expect(date.getMonth()).not.toEqual(0);
    expect(date.getDay()).not.toEqual(0);
  });
}
