## Town Square Task 

A simple application that renders a list from DB. The rendered lists can be reordered by drag and drop. 

https://town-square-client.onrender.com/

### Frontend:
- Client is a vite react app
- Styling is accomplised with MUI and Tailwind CSS
- Apollo Client is used to retrieve and update post lists
- Library called dnd-kit is used for drag and drop logic

### Backend and Database:
- Simple Node JS server
- Use Apollo Server to serve data
- SupaBase is used for DB operations
- Prisma is used as ORM
- Faker library is used to create mock data

### Deployment:
- Server is deployed as webservice on Render
- Client is deployed as a static website on Render
