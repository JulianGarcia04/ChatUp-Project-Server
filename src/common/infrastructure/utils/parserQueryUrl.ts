import { parse } from 'node:querystring';
import parser from './parser';

const parserQueryUrl = (str: string): any => {
  // parse to object string query in object and after get key and values
  const queryEntries = Object.entries(parse(str));
  // join the key with the values
  const stringQuery = queryEntries.map(q => {
    const qWithoutEmptyElement = q.filter(e => e?.length !== 0);
    return qWithoutEmptyElement.join('=');
  });
  // detach string value in string that check with the expresion regular
  const stringQueryParse = stringQuery.map(strQuery => {
    return strQuery.match(
      /(\b(\d{1,2}[-/]\d{1,2}[-/]\d{4}|\d{4}[-/]\d{2}[-/]\d{2})\b|([a-z])\w+|([|]|[<>]=?|=)+|\d+)/g,
    );
  });
  // and after map the strings to the filter structure
  const filters = stringQueryParse
    .map((filter, idx, arr) => {
      const accFilters: any[] = [];
      if (filter != null) {
        let filterModel = [];
        for (let i = 0; i < filter.length; i++) {
          const filterStr = filter[i];
          if (filterStr === '|') {
            accFilters.push(filterModel);
            filterModel = [];
            accFilters.push(filterStr + '|');
            continue;
          }
          if (filterStr === '=') {
            filterModel.push(filterStr + '=');
            continue;
          }
          filterModel.push(parser(filterStr));
          if (i === filter.length - 1) {
            accFilters.push(filterModel);
          }
        }
      }
      if (idx === arr.length - 1) {
        return accFilters;
      }
      return [...accFilters, '&&'];
    })
    .flat();

  const needFind = [
    {
      name: 'limit',
      value: null,
    },
    {
      name: 'skip',
      value: null,
    },
    {
      name: 'search',
      value: null,
    },
  ];

  needFind.forEach(obj => {
    const idx = filters.findIndex(filter => filter[0] === obj.name);
    if (idx === -1) {
      return;
    }
    obj.value = filters[idx][2] ?? null;
    filters.splice(idx, 2);
  });

  const limit = needFind.find(obj => obj.name === 'limit')?.value;
  const skip = needFind.find(obj => obj.name === 'skip')?.value;

  const search: string | null | undefined = needFind.find(
    obj => obj.name === 'search',
  )?.value;

  return { limit, skip, search, filters };
};

export default parserQueryUrl;
