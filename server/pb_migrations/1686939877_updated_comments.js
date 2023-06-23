migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("22jw1px2d5bqkng")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hezshize",
    "name": "parent",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "22jw1px2d5bqkng",
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
  collection.schema.removeField("hezshize")

  return dao.saveCollection(collection)
})
