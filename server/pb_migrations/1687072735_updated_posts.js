migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ofq0zyldjy9ixtu")

  collection.updateRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ofq0zyldjy9ixtu")

  collection.updateRule = null

  return dao.saveCollection(collection)
})
