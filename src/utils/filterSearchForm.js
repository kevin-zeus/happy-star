export default function (schema) {
  const newSchema = JSON.parse(JSON.stringify(schema));
  if (newSchema.properties.sort) {
    delete newSchema.properties.sort;
  }
  return newSchema;
}
