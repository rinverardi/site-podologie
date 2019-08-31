import React from "react";
import format from "date-fns/format";

import Jumbotron from "./components/jumbotron";

export default class PostPreview extends React.Component {
  render() {
    const {entry, getAsset} = this.props;
    let image = getAsset(entry.getIn(["data", "image"]));

    // Bit of a nasty hack to make relative paths work as expected as a background image here
    if (image && !image.fileObj) {
      image = window.parent.location.protocol + "//" + window.parent.location.host + image;
    }

    return <div>
      <Jumbotron image={image} title={entry.getIn(["data", "title"])} />

      <div className="bg-off-white pv4">
        {entry.getIn(["data", "intro", "heading"]) &&
          <div className="ph3 mw7 center">
            <h2 className="f2 b lh-title mb2">{entry.getIn(["data", "intro", "heading"])}</h2>
            <p className="mb4 mw6">{entry.getIn(["data", "intro", "description"])}</p>
          </div>
        }

        {entry.getIn(["data", "intro", "blurbs"]) &&
          <div className="ph3 mw7 center">
            <div className="flex-ns flex-wrap mhn2-ns mb3">
              {(entry.getIn(["data", "intro", "blurbs"]) || []).map((blurb, index) => <div className="ph2-ns w-50-ns mb4" key={index}>
                <img src={blurb.get("image") && getAsset(blurb.get("image"))} alt="" className="center db mb3" style={{width: "240px"}}/>
                <p>{blurb.get("text")}</p>
              </div>)}
            </div>
          </div>
        }
      </div>
    </div>;
  }
}
