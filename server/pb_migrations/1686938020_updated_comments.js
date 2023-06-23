migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("22jw1px2d5bqkng")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kxyui14x",
    "name": "user",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "i1ywe78pd2068k6",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("22jw1px2d5bqkng")

  // remove
  collection.schema.removeField("kxyui14x")

  return dao.saveCollection(collection)
})
