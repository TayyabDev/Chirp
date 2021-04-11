# Video Streaming App
Public URL - [http://3.80.243.76](http://3.80.243.76)

# Instructions
1) Make an account by signing up
2) Login to Account 
3) Download OBS [https://obsproject.com/](https://obsproject.com/)
4) Go to settings in OBS and go to the stream tab
5) Set Service to Custom..., Server to rtmp://3.80.243.76/live, and set the stream key to the one given in the dashboard after logging in
6) Press start stream and you should be able to see your stream running on the web app on the browse tab

## Team members
* Chun Ho Lee
* Tayyab Waqar

## Description of the web application
The application will be a video streaming application similar to Twitch. Users will be able to stream content and chat with friends during the live-stream.

## Description of features for the beta version
For the beta we will complete basic user streaming.

## Description of features for the final version
For the final version we have implemented live streams, live stream information, what streams are live, and chat feature.

## Description of the technologies to be used for building and deploying the application
We have used the following technologies MERN - Mongodb, Express, React, and Node. We have also used Docker, Socket IO API, and Node Media Server API.

## Description of the top 5 technical challenges
* Streaming content to other users over the cloud using OBS - Open Broadcast Software
* Making a page for users that have gone live 
* Chat component unique to each stream that is always online
* Integrating and setting up Sockets, Live stream permissions, and Docker on AWS by configuring and using nginx
* Dockerize the application so the application runs the same on Windows, Mac, and Linux
