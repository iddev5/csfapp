migrate((db) => {
  const collection = new Collection({
    "id": "ofq0zyldjy9ixtu",
    "created": "2023-06-14 13:23:55.076Z",
    "updated": "2023-06-14 13:23:55.076Z",
    "name": "posts",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "jer8yxph",
        "name": "title",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ofq0zyldjy9ixtu");

  return dao.deleteCollection(collection);
})
