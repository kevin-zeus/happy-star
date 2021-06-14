export default function (schema, ...field) {
  const newSchema = JSON.parse(JSON.stringify(schema));
  if (newSchema.properties) {
    Object.keys(newSchema.properties).forEach((key) => {
      if (!field.includes(key)) {
        delete newSchema.properties[key];
      }
    });
  }
  return newSchema;
}
