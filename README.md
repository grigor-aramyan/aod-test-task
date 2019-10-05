# Daily Report test task

### Idea
There are 3 users: admins, PMs and Devs. On first hand PM or admin can assign task to Dev in Users tab. Devs can see there tasks in Notifications tab and report on them in opened dialog box. Then admins and PMs can view reports either in Notifications or Reports tab, but updating of reports (accepting or rejecting) is available only in Notifications tab. Besides PM -> Dev -> Pm interaction on tasks and reports, which is available for admins as well, they can also view all users in Users tab, change user type of any user.

### Used libs
Besides mentioned libs there's Redux integrated in project - it simplifies separation of concerns when things get complex.

Babel and Webpack used for building project, nodemon and concurrently to fasten development process, eslint for code styling suggestions.

#### P.S.
Guess I didn't get to complete project in time. Users tab is implemented completely, Notifs partly and Reports page got the very least attention. Also client, server interaction is based on http request, response cycle, sockets connect to server, listen for messages but didn't get to use them for new notifications, reports incoming.

Code, comments in code and package.json should add simplicity in understanding project too.