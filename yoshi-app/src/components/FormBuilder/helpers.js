const isValidFieldParam = ({paramName, paramValue, shouldBeUnique, existingFields}) => {
    const errors = [];

    if (!paramValue.trim()) {
      errors.push(`Please provide a ${paramName}`);
    } else if (shouldBeUnique) {
      const existingValues = existingFields.map(field => field[paramName]);
      if (existingValues.includes(paramValue)) {
        errors.push(`This ${paramName} is already used in another field, please choose a different value`);
      }
    }

    return errors.length > 0 ? errors.join('. ') : undefined;
};

export {
  isValidFieldParam,
}
