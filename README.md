# Marathon

Marathon is project management application designed for agile teams that use scrum methodology to organize and prioritize their projects.
This project is the defense project for the React course (part of the JS Web Module at Software University).

## Table of Contents
1. [Technology stack](https://github.com/miraDask/Marathon#technology-stack)
2. [Screenshots](https://github.com/miraDask/Marathon#screenshots)
3. [Application Configurations](https://github.com/miraDask/Marathon#application-configurations)
4. [Credits](https://github.com/miraDask/Marathon#credits)

## Technology stack

Main languages : JS, C#

### Front End:

- React

- react-router

- @microsoft/signalr

- tailwindcss

- cloudinary



### Back End:

- ASP.NET Core 3.1

- Entity Framework Core 3.1

- SQL Server

- Redis

- SignalR

- Swagger

## Screenshots:

### Home Page

<img width="703" alt="home" src="https://user-images.githubusercontent.com/35633887/90960646-0e590400-e49b-11ea-90cf-97490ac10744.png">

### Home Page (logged in user)

<img width="960" alt="logged in home" src="https://user-images.githubusercontent.com/35633887/90960782-fdf55900-e49b-11ea-9914-2790098692b0.png">

### Profile Page

<img width="960" alt="profile page" src="https://user-images.githubusercontent.com/35633887/90961035-def7c680-e49d-11ea-8352-1630be1d7373.png">

### Projects Page (no projects)

<img width="960" alt="no projects" src="https://user-images.githubusercontent.com/35633887/90961011-a6f08380-e49d-11ea-8284-3b3d588c1a30.png">

### Projects Page (user has projects)

<img width="743" alt="all projects" src="https://user-images.githubusercontent.com/35633887/90960817-37c65f80-e49c-11ea-88ff-df4b9e3a66db.png">

### Projects Page (update/delete project)

<img width="830" alt="update project" src="https://user-images.githubusercontent.com/35633887/90961068-24b48f00-e49e-11ea-958a-83d663cfb8fa.png">

### Invitations Page (no invitations)

<img width="727" alt="no invitations" src="https://user-images.githubusercontent.com/35633887/90961167-e8356300-e49e-11ea-8a98-eb405315ddc4.png">

### Invitations Page (user has invitations)

<img width="960" alt="invitations" src="https://user-images.githubusercontent.com/35633887/90961127-98ef3280-e49e-11ea-9c7e-81eae3007f06.png">

### Team Details Page

<img width="776" alt="team" src="https://user-images.githubusercontent.com/35633887/90961210-27fc4a80-e49f-11ea-9114-21f85cdb86d3.png">

### Backlog Page

<img width="835" alt="backlog" src="https://user-images.githubusercontent.com/35633887/90961240-62fe7e00-e49f-11ea-82aa-6f107cce95d1.png">

### Backlog Page (create issue)

<img width="860" alt="create issue" src="https://user-images.githubusercontent.com/35633887/90961245-685bc880-e49f-11ea-9b6b-5d94c172a3fb.png">

### Board Page (no active sprint)

<img width="815" alt="board no active sprint" src="https://user-images.githubusercontent.com/35633887/90961326-f8017700-e49f-11ea-93bb-f1982c0e7220.png">

### Board Page (active sprint)

<img width="948" alt="board" src="https://user-images.githubusercontent.com/35633887/90961322-f46df000-e49f-11ea-8c32-f1e16e36b6fd.png">

### Board Page (complete sprint)

<img width="870" alt="complete sprint" src="https://user-images.githubusercontent.com/35633887/90961332-fdf75800-e49f-11ea-86b2-3056f4d098db.png">



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

### Credits:

Using [DrawKit](https://www.drawkit.io/) Watermelon Illustrations Pack.
