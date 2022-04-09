## API routes

 - Browse  GET    /maps 
 - Read    GET    /maps/:id 
 - Read    GET    /maps/create 
 - Read    GET    /profiles/:id
 - Read    GET    /favorites/:id

 - Add     POST   /maps/create
 - Edit    POST   /maps/:id (Edit point in db)  
 - Delete  POST   /maps/:id/delete (Delete point from db)

 - Delete  DELETE /profiles/:id/delete (Delete created map from db) 

 - Add     POST   /favorites/:id (Add fav to db)
 - Delete  DELETE /favorites/:id/delete (Delete map from favorites)
