export default function (schema, fields = [], uniKey) {
  const newSchema = JSON.parse(JSON.stringify(schema));
  if (newSchema.properties) {
    Object.keys(newSchema.properties).forEach((key) => {
      if (!fields.includes(key) || uniKey !== key) {
        delete newSchema.properties[key];
      } else if (uniKey === key) {
        newSchema.properties[key].disabled = true;
      }
    });
  }
  return newSchema;
}
