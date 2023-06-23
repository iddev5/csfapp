migrate((db) => {
  const collection = new Collection({
    "id": "i1ywe78pd2068k6",
    "created": "2023-06-16 17:20:11.734Z",
    "updated": "2023-06-16 17:20:11.734Z",
    "name": "publicusers",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "8cu3aaln",
        "name": "username",
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
        "id": "qjo1grhp",
        "name": "user",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
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
  const collection = dao.findCollectionByNameOrId("i1ywe78pd2068k6");

  return dao.deleteCollection(collection);
})
