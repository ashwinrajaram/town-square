# Town Square Task 

A simple application that renders a list from DB. The rendered lists can be reordered by drag and drop. 
 
![CroppedGif.gif](https://github.com/ashwinrajaram/town-square/blob/master/CroppedGif.gif?raw=true)


## Project Overview

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

## Install instruction
To run the applicaiton locally, you will need to run both the client and the server at the same time. 
> :exclamation:IMPORTANT: You will need to create a Supabase account to connect to DB. Create a project in your account and click on 'connect'. This should give you your 'DATABASE_URL' and 'DIRECT_URL', which will be used to setup our server.

Clone this repo from `git clone https://github.com/ashwinrajaram/town-square.git`


### Setup Server
Open a new terminal on the root directory
1. run `cd server`
2. run `npm i`
3. create `.env` file
4. create 2 variables 'DATABASE_URL', 'DIRECT_URL' and assign respective values (This can be found on your supabase account).
5. run `npx prisma generate`
6. run `npm run seed` to create mock data
7. run `cd src`
8. run `node index.js`

### Setup Client 
Open a new terminal on the root directory
1. Run `cd client`
2. Run `npm i`
3. create `.env` file
4. create a variable named 'VITE_REQUEST_URL' and assign server's URL
5. Run `npm run dev`

### Known Issue 
On your local setup, if you are using Mac with 'iCloud Relay' turned on, your connection might drop off occassionally. Turning iCloud Relay off would fix this issue.


## Questions? 
email: ashwin.rajaram@hotmail.com
