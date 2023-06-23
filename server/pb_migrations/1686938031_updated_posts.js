migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ofq0zyldjy9ixtu")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "udciw2cv",
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
  const collection = dao.findCollectionByNameOrId("ofq0zyldjy9ixtu")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "udciw2cv",
    "name": "user",
    "type": "relation",
    "required": false,
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
})
