type Item = any;
type Score = number;
type Index = number;

type Collection = any;
type CollectionSort = (
  collection: Collection,
) => (compareFn: CompareFn) => Collection;

type Criteria = (item: Item) => Score;
type Criterias = Criteria[];

type CompareFn = (a: Item, b: Item) => Score;
type ConfrontFn = (criteria: Criteria) => CompareFn;

const getWeight = (idx: Index, crits: Criteria[]) =>
  Math.pow(10, crits.length - idx);

const defaultSortFn: CollectionSort = collection => collection.sort;

const confront: ConfrontFn = criteria => (a, b) => {
  const critA = criteria(a);
  const critB = criteria(b);
  if (critA < critB) {
    return -1;
  }
  if (critA > critB) {
    return 1;
  }
  return 0;
};

const getSorter = (
  criterias: Criterias,
  sortFn: CollectionSort = defaultSortFn,
) => (collection: Collection) => {
  const compare: CompareFn = (a, b) =>
    criterias.reduce((score, crit, idx, crits) => {
      return score + confront(crit)(a, b) * getWeight(idx, crits);
    }, 0);
  return sortFn(collection)(compare);
};

const sort = (
  collection: Collection,
  criterias: Criterias,
  sortFn: CollectionSort = defaultSortFn,
) => getSorter(criterias, sortFn)(collection);

export { getSorter };
export default sort;
