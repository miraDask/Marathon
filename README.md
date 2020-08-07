# Marathon

Marathon is project management application designed for agile teams that use scrum methodology to organize and prioritize their projects.


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



## Application Configurations

### Front End:

- run "yarn install" or "npm install" to install all dependencies for the project 

- The project uses Tailwind CSS framework, that makes designing easer, but needs some set up:

- run "npx tailwindcss init" - This will create a minimal tailwind.config.js file at the root of your project,

	but you should move it to "src" folder in order project to works properly;

- There is Cloudinary upload image widget implemented in the profile page, so you need to have your own Cloudinary account and do some changes to be able to use or try this functionality:

- create ".env" file in the root directory of the project and create variables for the Cloudinary "cloudName" and "uploadPreset", 

   that are needed for uploading images to Cloudinary server. It is important variables to start with "REACT_APP_", for example:

   >REACT_APP_CLOUD_NAME=your_cloud_name

   >REACT_APP_CLOUD_PRESET=your_uploadPreset

  

### Back End:

- ASP.NET Core 3.1

- Entity Framework Core 3.1

- MS SQL Server

- Redis

- SignalR
