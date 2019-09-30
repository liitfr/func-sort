type Item = any;
type Score = number;
type Index = number;
type Weight = number;

type Collection = any;
type CollectionSort = (
  collection: Collection,
  comparator: Comparator,
) => Collection;

type WeightGenerator = (index: Index, comparators: Comparators) => Weight;
type Criteria = (item: Item) => Score;
type Comparator = (a: Item, b: Item) => Score;
type Comparators = Comparator[];
type ComparatorGenerator = (criteria: Criteria) => Comparator;

const defaultWeightGenerator: WeightGenerator = (index, comparators) =>
  Math.pow(10, comparators.length - index);

const defaultSort: CollectionSort = (collection, comparator) =>
  [...collection].sort(comparator);

const simpleComparator: ComparatorGenerator = criteria => (a, b) => {
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
  comparators: Comparators,
  sort: CollectionSort = defaultSort,
  weightGenerator: WeightGenerator = defaultWeightGenerator,
) => (collection: Collection) => {
  const globalComparator: Comparator = (a, b) =>
    comparators.reduce((score, comp, index, comps) => {
      return score + comp(a, b) * weightGenerator(index, comps);
    }, 0);
  return sort(collection, globalComparator);
};

const sort = (
  collection: Collection,
  comparators: Comparators,
  sort: CollectionSort = defaultSort,
) => getSorter(comparators, sort)(collection);

export { getSorter, simpleComparator };
export default sort;
