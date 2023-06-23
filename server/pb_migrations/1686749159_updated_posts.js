migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ofq0zyldjy9ixtu")

  collection.indexes = []

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ofq0zyldjy9ixtu")

  collection.indexes = [
    "CREATE INDEX `idx_jyrNvBb` ON `posts` (`created`)"
  ]

  return dao.saveCollection(collection)
})
