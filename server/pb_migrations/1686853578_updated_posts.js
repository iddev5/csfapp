migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ofq0zyldjy9ixtu")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zuhfgqlg",
    "name": "field",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
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

  // remove
  collection.schema.removeField("zuhfgqlg")

  return dao.saveCollection(collection)
})
