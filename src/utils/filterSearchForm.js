export default function (schema, ...field) {
  const newSchema = JSON.parse(JSON.stringify(schema));
  if (newSchema.properties) {
    Object.keys(newSchema.properties).forEach((key) => {
      if (!field.includes(key)) {
        delete newSchema.properties[key];
      } else {
        newSchema.properties[key].required = false;
        newSchema.properties[key].disabled = false;
        newSchema.properties[key].readOnly = false;
        newSchema.properties[key].hidden = false;
      }
    });
  }
  return newSchema;
}
