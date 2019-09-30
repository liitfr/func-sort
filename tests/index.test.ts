import sort, { simpleComparator } from '../src';

const list = [
  {
    level: null,
    label: 'g',
    type: 'S',
  },
  {
    level: null,
    label: 'h',
    type: 'T',
  },
  {
    level: 2,
    label: 'a',
    type: 'T',
  },
  {
    level: 2,
    label: 'b',
    type: 'S',
  },
  {
    level: 2,
    label: 'c',
    type: 'T',
  },
  {
    level: 1,
    label: 'd',
    type: 'T',
  },
  {
    level: 1,
    label: 'e',
    type: 'S',
  },
  {
    level: 1,
    label: 'f',
    type: 'T',
  },
];

const expectedResult = [
  {
    level: 2,
    label: 'a',
    type: 'T',
  },
  {
    level: 2,
    label: 'c',
    type: 'T',
  },
  {
    level: 2,
    label: 'b',
    type: 'S',
  },
  {
    level: 1,
    label: 'd',
    type: 'T',
  },
  {
    level: 1,
    label: 'f',
    type: 'T',
  },
  {
    level: 1,
    label: 'e',
    type: 'S',
  },
  {
    level: null,
    label: 'h',
    type: 'T',
  },
  {
    level: null,
    label: 'g',
    type: 'S',
  },
];

const lIdx = (item: any) => [2, 1, 0, null].indexOf(item.level);
const tIdx = (item: any) => ['T', 'S'].indexOf(item.type);
const laIdx = (item: any) => item.label.charCodeAt(0) - 97;

const sortedList = sort(
  list,
  [lIdx, tIdx, laIdx].map(criteria => simpleComparator(criteria)),
);

test('runs as expected', () => {
  expect(sortedList).toEqual(expectedResult);
});
