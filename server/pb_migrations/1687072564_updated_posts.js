migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ofq0zyldjy9ixtu")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "guz7m7cq",
    "name": "points",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ofq0zyldjy9ixtu")

  // remove
  collection.schema.removeField("guz7m7cq")

  return dao.saveCollection(collection)
})
