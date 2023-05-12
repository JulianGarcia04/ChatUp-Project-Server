import { logicalOperators, queryOperators } from './enumOperators';

type stringQueryOperator = keyof typeof queryOperators;
type stringLogicalOperator = keyof typeof logicalOperators;

const parserFilter = (filters: any[], baseCondition?: any): any => {
  let condition = baseCondition ?? {};
  let prevOperator = logicalOperators['&&'];
  filters.forEach((f, idx, arr) => {
    // check if the element is array (only array)
    if (Array.isArray(f)) {
      // get next element array
      const nextElement = arr[idx + 1];
      // get query operator that is required
      const queryOperator = queryOperators[f[1] as stringQueryOperator];
      // get logical operator that if doesnt has then return empty string
      const logicalOperator =
        nextElement != null &&
        typeof nextElement === 'string' &&
        !Array.isArray(nextElement)
          ? logicalOperators[nextElement as stringLogicalOperator]
          : prevOperator;
      prevOperator = logicalOperator;
      if (Object.hasOwn(condition, logicalOperator)) {
        condition[logicalOperator].push({ [f[0]]: { [queryOperator]: f[2] } });
        return;
      }
      condition = {
        ...condition,
        [logicalOperator]: [{ [f[0]]: { [queryOperator]: f[2] } }],
      };
    }
  });
  return condition;
};

export default parserFilter;
