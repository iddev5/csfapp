migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("22jw1px2d5bqkng")

  collection.createRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("22jw1px2d5bqkng")

  collection.createRule = null

  return dao.saveCollection(collection)
})
