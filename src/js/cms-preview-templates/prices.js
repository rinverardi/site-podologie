import React from "react";
import { List } from 'immutable';

import Jumbotron from "./components/jumbotron";

const Note = ({text}) => {
  return <p>{price}</p>;
};

const Price = ({heading, text, price}) => {
  return <div>
    <h2 class="b bf2 lh-title p4">{heading}</h2>
    <div className="center flex mb3">
      <span className="w-60">{text}</span>
      <span className="w-40">{price}</span>
    </div>
  </div>;
};

export default class PricesPreview extends React.Component {
  render() {
    const {entry, getAsset} = this.props;
    
    let image = getAsset(entry.getIn(["data", "image"]));

    // Bit of a nasty hack to make relative paths work as expected as a background image here
    if (image && !image.fileObj) {
      image = window.parent.location.protocol + "//" + window.parent.location.host + image;
    }
   
    const notes = entry.getIn(["data", "notes"]);
    const notesArray = notes ? notes.toJS() : [];
 
    const prices = entry.getIn(["data", "prices"]);
    const pricesArray = prices ? prices.toJS() : [];
    
    return <div>
      <Jumbotron image={image} title={entry.getIn(["data", "title"])} />
      <div className="bg-off-white pv4">
        {pricesArray.map(({heading, text, price}, i) =>
          <Price key={i} heading={heading} text={text} price={price} />
        )}
      </div>
      <div className="bg-off-white pv4">
        {notesArray.map(({text}, i) =>
          <Note key={i} text={text} />
        )}
      </div>
    </div>;
  }
}
