# Chirp - The Live Streaming App

Chirp is a website where gamers can stream their content for others to watch and chat with people. Here's a preview of Chirp:

![image](https://user-images.githubusercontent.com/19651696/116012311-ce34bd00-a5f7-11eb-9930-1494940620a0.png)

# Local Setup
To build Chirp locally, you'll need to have [Docker Compose](https://docs.docker.com/compose/install/) installed on your system.
1) Clone this repository
2) In the project root, run ```make buildandrun```, or ```docker-compose --build up```
3) Open up a browser and visit http://localhost:80

# User Guide
1) Make an account by signing up
2) Login to the account.
3) Download OBS [https://obsproject.com/](https://obsproject.com/)
4) Go to settings in OBS and go to the stream tab
5) Set Service to Custom..., Server to rtmp://localhost/live, and set the stream key to the one given in the dashboard after logging in
6) Press start stream and you should be able to see your stream running on the web app on the browse tab!

# Architecture

The frontend for Chirp is written in React, and the static build files are served by NGINX. Chirp uses Express.js as an API backend. The livestream video data is sent to our [Node Media Server](https://github.com/illuspas/Node-Media-Server) instance, which handles the RTMP stream and transcodes it to [MPEG-DASH](https://en.wikipedia.org/wiki/Dynamic_Adaptive_Streaming_over_HTTP) using FFMPEG. 

We use Docker Compose to break these up into 3 microservices; one for the frontend, one for the backend, and one for the media server. The frontend is served by NGINX, and it reverse proxies specific requests to the backend server and the media server. 
