migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i1ywe78pd2068k6")

  collection.indexes = [
    "CREATE INDEX `idx_QUO6m3l` ON `publicusers` (`user`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i1ywe78pd2068k6")

  collection.indexes = []

  return dao.saveCollection(collection)
})
