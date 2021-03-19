import React from "react";

var djs = require("dashjs");
// Render a YouTube video player
export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      streamKey: this.props.streamKey,
    };
  }
  async componentDidMount() {
    const url = `http://localhost:8000/live/${this.state.streamKey}/index.mpd`;
    console.log(url);
    const video = this.player;
    const dashjs = djs.MediaPlayer().create();
    dashjs.initialize(video, url, true);
  }
  render() {
    return (
      <div>
        <div class="embed-responsive embed-responsive-16by9">
          <video
            controls
            autoPlay
            muted
            ref={(player) => (this.player = player)}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    );
  }
}
