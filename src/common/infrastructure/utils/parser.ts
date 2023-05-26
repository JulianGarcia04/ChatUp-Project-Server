function parser(str: string): any {
  if (str === 'null') {
    return null;
  }

  const check = str.match(
    /\b(\d{1,2}[-/]\d{1,2}[-/]\d{4}|\d{4}[-/]\d{2}[-/]\d{2})\b/g,
  );

  if (check != null && check?.length > 0) {
    return new Date(str);
  }

  // intentar convertir la cadena en un número entero
  const num = parseInt(str);
  if (!isNaN(num)) {
    return num;
  }

  // intentar convertir la cadena en un número decimal
  const float = parseFloat(str);
  if (!isNaN(float)) {
    return float;
  }

  // intentar convertir la cadena en un valor booleano
  if (str.toLowerCase() === 'true') {
    return true;
  } else if (str.toLowerCase() === 'false') {
    return false;
  }

  // si la cadena no representa un número ni un valor booleano, devolver la cadena original
  return str;
}

export default parser;
