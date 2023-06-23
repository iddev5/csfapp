migrate((db) => {
  const collection = new Collection({
    "id": "mu7gjh4glln6g4v",
    "created": "2023-06-20 07:19:08.682Z",
    "updated": "2023-06-20 07:19:08.682Z",
    "name": "votes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "jaacdie9",
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
      },
      {
        "system": false,
        "id": "iwbk9a7l",
        "name": "post",
        "type": "relation",
        "required": false,
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
  const collection = dao.findCollectionByNameOrId("mu7gjh4glln6g4v");

  return dao.deleteCollection(collection);
})
