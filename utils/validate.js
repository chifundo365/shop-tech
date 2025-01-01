class Validate {
  /**
     * 
     * @param {Array} fields - given fields
     * @param {Array} required  - required fields
     * @returns  {Object} - object of missing  field as key and a message a s vaalue
     */
  static requiredFields(fields, required) {
    const missing = {};
    if (Array.isArray(fields)) {
      for (let r of required) {
        if (!fields.includes(r)) {
          missing[r] = "Field is required";
        }
      }
    }

    return missing;
  }
}

export default Validate;
