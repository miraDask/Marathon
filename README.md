# Marathon

Marathon is project management application designed for agile teams that use scrum methodology to organize and prioritize their projects.
This project is the defense project for the React course (part of the JS Web Module at Software University).

## Technology stack

Main languages & libraries :

### Front End:

- React

- Webpack

- Babel

- react-router

- @microsoft/signalr

- tailwindcss

- cloudinary



### Back End:

- ASP.NET Core 3.1

- Entity Framework Core 3.1

- MS SQL Server

- Redis

- SignalR

- Swagger

## Snapshots:
### Home Page (Guest)
<img width="703" alt="home" src="https://user-images.githubusercontent.com/35633887/90960646-0e590400-e49b-11ea-90cf-97490ac10744.png">


## Application Configurations

### Front End:

- run "yarn install" or "npm install" to install all dependencies for the project 

- The project uses Tailwind CSS framework, that makes designing easer, but needs some set up:

- run "npx tailwindcss init" - This will create a minimal tailwind.config.js file at the root of your project,

	but you should move it to "src" folder in order project to works properly;

- There is Cloudinary upload image widget implemented in the profile page, so you need to have your own Cloudinary account and do some changes to be able to use or try this functionality:

- create ".env" file in the root directory of the project and create variables for the Cloudinary "cloudName" and "uploadPreset", which are needed for uploading images to Cloudinary server. It is important variables to start with "REACT_APP_", for example:

   >REACT_APP_CLOUD_NAME=your_cloud_name

   >REACT_APP_CLOUD_PRESET=your_uploadPreset

  

### Back End:

- Check connection string in appsettings.json.
   If you don't use SQLEXPRESS you should replace "Server=.\\SQLEXPRESS..." with "Server=.;...".

- App depends on [Redis](https://redis.io/download) server for caching, so make sure that you have it installed.
