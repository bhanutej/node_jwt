const _ = require('lodash');
const jdata = {
  "error": {
      "first_name": {
          "message": "Path `first_name` is required.",
          "name": "ValidatorError",
          "properties": {
              "message": "Path `{PATH}` is required.",
              "type": "required",
              "path": "first_name",
              "value": ""
          },
          "kind": "required",
          "path": "first_name",
          "value": "",
          "$isValidatorError": true
      },
      "address.street_one": {
          "message": "Path `street_one` is required.",
          "name": "ValidatorError",
          "properties": {
              "message": "Path `{PATH}` is required.",
              "type": "required",
              "path": "street_one",
              "value": ""
          },
          "kind": "required",
          "path": "street_one",
          "value": "",
          "$isValidatorError": true
      },
      "address.door_no": {
          "message": "Path `door_no` is required.",
          "name": "ValidatorError",
          "properties": {
              "message": "Path `{PATH}` is required.",
              "type": "required",
              "path": "door_no",
              "value": ""
          },
          "kind": "required",
          "path": "door_no",
          "value": "",
          "$isValidatorError": true
      },
      "address.city": {
          "message": "Path `city` is required.",
          "name": "ValidatorError",
          "properties": {
              "message": "Path `{PATH}` is required.",
              "type": "required",
              "path": "city",
              "value": ""
          },
          "kind": "required",
          "path": "city",
          "value": "",
          "$isValidatorError": true
      },
      "address.pincode": {
          "message": "Path `pincode` is required.",
          "name": "ValidatorError",
          "properties": {
              "message": "Path `{PATH}` is required.",
              "type": "required",
              "path": "pincode",
              "value": ""
          },
          "kind": "required",
          "path": "pincode",
          "value": "",
          "$isValidatorError": true
      },
      "address.state": {
          "message": "Path `state` is required.",
          "name": "ValidatorError",
          "properties": {
              "message": "Path `{PATH}` is required.",
              "type": "required",
              "path": "state",
              "value": ""
          },
          "kind": "required",
          "path": "state",
          "value": "",
          "$isValidatorError": true
      },
      "address": {
          "errors": {
              "street_one": {
                  "message": "Path `street_one` is required.",
                  "name": "ValidatorError",
                  "properties": {
                      "message": "Path `{PATH}` is required.",
                      "type": "required",
                      "path": "street_one",
                      "value": ""
                  },
                  "kind": "required",
                  "path": "street_one",
                  "value": "",
                  "$isValidatorError": true
              },
              "door_no": {
                  "message": "Path `door_no` is required.",
                  "name": "ValidatorError",
                  "properties": {
                      "message": "Path `{PATH}` is required.",
                      "type": "required",
                      "path": "door_no",
                      "value": ""
                  },
                  "kind": "required",
                  "path": "door_no",
                  "value": "",
                  "$isValidatorError": true
              },
              "city": {
                  "message": "Path `city` is required.",
                  "name": "ValidatorError",
                  "properties": {
                      "message": "Path `{PATH}` is required.",
                      "type": "required",
                      "path": "city",
                      "value": ""
                  },
                  "kind": "required",
                  "path": "city",
                  "value": "",
                  "$isValidatorError": true
              },
              "pincode": {
                  "message": "Path `pincode` is required.",
                  "name": "ValidatorError",
                  "properties": {
                      "message": "Path `{PATH}` is required.",
                      "type": "required",
                      "path": "pincode",
                      "value": ""
                  },
                  "kind": "required",
                  "path": "pincode",
                  "value": "",
                  "$isValidatorError": true
              },
              "state": {
                  "message": "Path `state` is required.",
                  "name": "ValidatorError",
                  "properties": {
                      "message": "Path `{PATH}` is required.",
                      "type": "required",
                      "path": "state",
                      "value": ""
                  },
                  "kind": "required",
                  "path": "state",
                  "value": "",
                  "$isValidatorError": true
              }
          },
          "_message": "Validation failed",
          "message": "Validation failed: street_one: Path `street_one` is required., door_no: Path `door_no` is required., city: Path `city` is required., pincode: Path `pincode` is required., state: Path `state` is required.",
          "name": "ValidationError"
      }
  }
};
var keys = Object.keys(jdata.error);
const ers = _.map(jdata, (error) => {
  return error;
});
const errs = {}
_.map(keys, (key) => {
  errs[`${key}`] = jdata.error[`${key}`]["message"];
  return JSON.stringify(errs);
});
console.log(ers);
console.log(keys);
console.log("OOOOOO"+JSON.stringify(errs));