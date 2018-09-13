# Chabu
The main purpose of this project is to learn Reactjs (MERN stack) by creating a forum like application. 

Current progress: 
Backend NodeJs REST API server is complete. Handles authentication, authroization, validation, errors, email verification,
fulltext searching, security and effeciently uses Promise.all.  

Next step: 
Handle refreshing json web tokens.


API Endpoints v1

| Method 	| Endpoint                                                     	| Description                                                                                                  	|
|--------	|--------------------------------------------------------------	|--------------------------------------------------------------------------------------------------------------	|
| POST   	| login/                                                       	| authenticate account                                                                                         	|
|        	|                                                              	|                                                                                                              	|
| POST   	| accounts/                                                    	| create new account                                                                                           	|
| GET    	| accounts/                                                    	| get current account settings                                                                                 	|
| PATCH  	| accounts/                                                    	| update current account settings                                                                              	|
| POST   	| accounts/verify                                              	| send email verification to current account                                                                   	|
| GET    	| accounts/verify/:tokenID                                     	| add verified email to current account                                                                        	|
|        	|                                                              	|                                                                                                              	|
| POST   	| rooms/                                                       	| create new room                                                                                              	|
| DELETE 	| rooms/:roomID                                                	| delete specific room                                                                                         	|
| PATCH  	| rooms/:roomID                                                	| update specific room                                                                                         	|
| GET    	| rooms/:roomID                                                	| get specific room                                                                                            	|
| POST   	| rooms/:roomID                                                	| create new question in a room                                                                                	|
| GET    	| rooms/:roomID?keywords=computer+science&view=month&sort=likes:1 	| filter and sort questions within room by keywords in title, view by week or month, sort results by any field 	|
| PATCH  	| rooms/:roomID/join                                           	| join or leave a room                                                                                         	|
| DELETE 	| rooms/:roomID/:questionID                                    	| delete specific question from a room                                                                         	|
|        	|                                                              	|                                                                                                              	|
| GET    	| questions/:questiondID                                       	| get specific question                                                                                        	|
| PATCH  	| questions/:questionID                                        	| update specific question                                                                                     	|
| POST   	| questions/:questionID                                        	| create new comment on question                                                                               	|
| PATCH  	| questions/:questionID/like                                   	| like or unlike a question                                                                                    	|
|        	|                                                              	|                                                                                                              	|
| POST   	| comments/:commentID                                          	| reply to a comment                                                                                           	|
| PATCH  	| comments/:commentID                                          	| update specific comment                                                                                      	|
| DELETE 	| comments/:commentID                                          	| delete specific comment                                                                                      	|
