migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ofq0zyldjy9ixtu")

  collection.createRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ofq0zyldjy9ixtu")

  collection.createRule = null

  return dao.saveCollection(collection)
})
