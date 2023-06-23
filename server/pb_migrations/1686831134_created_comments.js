migrate((db) => {
  const collection = new Collection({
    "id": "22jw1px2d5bqkng",
    "created": "2023-06-15 12:12:14.724Z",
    "updated": "2023-06-15 12:12:14.724Z",
    "name": "comments",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "7bkh0gv1",
        "name": "text",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "8u1eh72n",
        "name": "post",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "ofq0zyldjy9ixtu",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
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
  const collection = dao.findCollectionByNameOrId("22jw1px2d5bqkng");

  return dao.deleteCollection(collection);
})
