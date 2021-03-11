# Run application
`node app.js`

# Stream video
- Start application
- Download OBS and go to Settings->Stream with the following credentials
  - Stream Type: Custom
  - URL: rtmp://localhost/live
  - Stream key: STREAM_NAME
- Download VLC media player and go to Media->Open Network Stream and put the network URL http://localhost:8000/live/STREAM_NAME.flv

# TO DO for beta
- Backend for live streams
- Uploads VODs to database (may need to use a separate database for intensive mp4 uploads)

# Credits
- https://developer.mongodb.com/quickstart/node-connect-mongodb/
- https://www.linode.com/docs/guides/build-react-video-streaming-app/
- https://www.npmjs.com/package/node-media-server
