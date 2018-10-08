# Chabu
Preview of progress (colors not accurate):
![Alt Text](https://github.com/DrSleepy/Chabu/blob/master/preview.gif)

The main purpose of this project is to learn Reactjs (MERN stack) by creating a forum like application.

Back end - Progress: Complete.
Back end NodeJs REST API server is complete. Handles authentication, authroization, validation, errors, email verification,
fulltext searching, security and effeciently uses Promise.all.

Front end - Progress: Completed all view components. Nearing app completion. Fine tuning still needed.

API Endpoints v1

| Method | Endpoint                                           | Description                                                                       |
| ------ | -------------------------------------------------- | --------------------------------------------------------------------------------- |
| POST   | login/                                             | authenticate account                                                              |
| POST   | logout/                                            | clears https cookie from client                                                   |
|        |                                                    |                                                                                   |
| POST   | accounts/                                          | create new account                                                                |
| GET    | accounts/                                          | get current account settings                                                      |
| PATCH  | accounts/                                          | update current account settings                                                   |
| GET    | accounts/joined-rooms                              | get all joined rooms of current user                                              |
| GET    | accounts/created-rooms                             | get all created rooms of current user                                             |
| GET    | accounts/created-questions                         | get all created quesitons of current user                                         |
| POST   | accounts/verify                                    | send email verification to current account                                        |
| GET    | accounts/verify/:token                             | add verified email to current account                                             |
| POST   | accounts/reset                                     | send email containing password reset link                                         |
| POST   | accounts/reset/:token                              | reset account password                                                            |
|        |                                                    |                                                                                   |
| POST   | rooms/                                             | create new room                                                                   |
| DELETE | rooms/:roomID                                      | delete specific room                                                              |
| PATCH  | rooms/:roomID                                      | update specific room                                                              |
| GET    | rooms/:roomID                                      | get specific room                                                                 |
| POST   | rooms/:roomID                                      | create new question in a room                                                     |
| GET    | rooms/:roomID?keywords=computer+science&view=month | filter questions within room by keywords in title or view by today, week or month |
| PATCH  | rooms/:roomID/join                                 | join or leave a room                                                              |
| DELETE | rooms/:roomID/:questionID                          | delete specific question from a room                                              |
|        |                                                    |                                                                                   |
| GET    | questions/:questionID                              | get specific question                                                             |
| PATCH  | questions/:questionID                              | update specific question                                                          |
| POST   | questions/:questionID                              | create new comment on question                                                    |
| PATCH  | questions/:questionID/like                         | like or unlike a question                                                         |
|        |                                                    |                                                                                   |
| GET    | comments/:commentID                                | get a specific comment                                                            |
| POST   | comments/:commentID                                | reply to a comment                                                                |
| PATCH  | comments/:commentID                                | update specific comment                                                           |
| DELETE | comments/:commentID                                | delete specific comment                                                           |
