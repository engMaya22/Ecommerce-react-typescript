const isString = (value:unknown): value is string =>{
    //value is string is typescript predicate 
  return typeof value === 'string';
}
export { isString}

