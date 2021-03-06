import React from "react";

const ContactEntry = ({heading, text, detail0, detail1, detail2, detail3}) =>
  <div>
    <h4 className="f4 b lh-title mb2 primary">{ heading }</h4>
    <p>
      { text }<br/>
      { detail0 }<br/>
      { detail1 }<br/>
      { detail2 }<br/>
      { detail3 }
    </p>
  </div>;

const ContactEntries = ({data}) => data && data.length > 0
    ? <div className="flex-ns mb3">
      {data.map(({heading, text, detail0, detail1, detail2, detail3}) => <ContactEntry heading={heading} text={text} detail0={detail0} detail1={detail1} detail2={detail2} detail3={detail3}/>)}
    </div>
    : "";

export default class ContactPreview extends React.Component {
  render() {
    const {entry, getAsset, widgetFor} = this.props;
    const entryContactEntries = entry.getIn(["data", "contact_entries"]);
    const contactEntries = entryContactEntries ? entryContactEntries.toJS() : [];
    return <div className="ph3 bg-off-white">
      <img src={getAsset(entry.getIn(["data", "logo"]))} alt="" className="db w4 center pv4" />
      <div className="center mw6 pv3">
        <ContactEntries data={contactEntries} />
      </div>
    </div>;
  }
}
