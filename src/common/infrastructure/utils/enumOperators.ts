export enum queryOperators {
  '==' = '$eq',
  '>' = '$gt',
  '>=' = '$gte',
  'includes' = '$in',
  '<' = '$lt',
  '<=' = '$lte',
  '!=' = '$ne',
  'no-includes' = '$nin',
}

export enum logicalOperators {
  '&&' = '$and',
  '||' = '$or',
}
