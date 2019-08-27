import React from "react";
import { List } from 'immutable';

import Jumbotron from "./components/jumbotron";

const AboutEntry = ({heading, text}) => {
  return <div className="center flex-l mhn1-l mw7">
    <h2 className="b f2 lh-title mb2 w-40-l">{heading}</h3>
    <p className="mb0 w-60-l">{text}</p>
  </div>;
};

export default class AboutPreview extends React.Component {
  render() {
    const {entry, getAsset} = this.props;
    
    let image = getAsset(entry.getIn(["data", "image"]));

    // Bit of a nasty hack to make relative paths work as expected as a background image here
    if (image && !image.fileObj) {
      image = window.parent.location.protocol + "//" + window.parent.location.host + image;
    }
    
    const entryValues = entry.getIn(["data", "about_entries"]);
    const values = entryValues ? entryValues.toJS() : [];
    
    return <div>
      <Jumbotron image={image} title={entry.getIn(["data", "title"])} />
      <div className="bg-off-white pv4">
        {values.map(({text, heading, imageUrl}, i) =>
          <AboutEntry key={i} text={text} heading={heading} />
        )}
      </div>
    </div>;
  }
}
