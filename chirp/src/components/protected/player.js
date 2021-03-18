import React from "react";
var djs = require("dashjs");

// Render a YouTube video player
export default class VideoPlayer extends React.Component {
  state = {};
  componentDidUpdate() {
    const url = "http://localhost:8000/live/test/index.mpd";
    const video = this.player;
    const dashjs = djs.MediaPlayer().create();
    dashjs.initialize(video, url, true);
  }
  render() {
    return (
      <div class="embed-responsive embed-responsive-16by9">
        <video
          controls
          autoplay
          muted
          ref={(player) => (this.player = player)}
        />
      </div>
    );
  }
}
