class Validate {
  /**
     * 
     * @param {Array} fields - given fields
     * @param {Array} required  - required fields
     * @returns  {Object} - object of missing  field as key and a message a s vaalue
     */
  static requiredFields(fields, required) {
    const missing = {};

    for (let r of required) {
      if (!Object.keys(fields).includes(r)) {
        missing[r] = "Field is missing";
      } else if (fields[r] === "") {
        missing[r] = "Field can't be empty";
      }
    }

    return missing;
  }
}

export default Validate;
