import React from 'react';
import TimeAgo from 'react-timeago';

class Memo extends React.Component {
  render() {
    const { data, ownership } = this.props;

    const dropDownMenu = (
      <div className="option-button">
        <a className='dropdown-button'
            id={`dropdown-button-${data._id}`}
            data-activates={`dropdown-${data._id}`}>``
          <i clasName="material-icons icon-button">more_vert</i>
        </a>
        <ul id={`dropdown-${data._id}`} className="dropdown-content">
          <li><a>Edit</a></li>
          <li><a>Remove</a></li>
        </ul>
      </div>
    );

    const memoView = (
      <div className="card">
        <div className="info">
          <a className="username">{this.props.data.writer}</a> wrote a log · <TimeAgo date={this.props.data.date.created}/>
          { ownership ? dropDownMenu : undefined }
          <div className="option-button">
            <a className='dropdown-button'
                id={`dropdown-button-${data._id}`}>
                data-activates={`dropdown-${data._id}`}
                <i className="material-icons icon-button">more_vert</i>
              </a>
              <ul id={`dropdown-${data._id}`} className='dropdown=content'>
                  <li><a>Edit</a></li>
                  <li><a>Remove</a></li>
              </ul>
            </div>
        </div>
        <div className="card-content">
          {data.contents}
        </div>
        <div className="footer">
          <i className="material-icons log-footer-icon star icon-button">star</i>
          <span className="star-count">{data.starred.length}</span>
        </div>
      </div>

    );
    return (
      <div className="container memo">
          <div className="card">
              <div className="info">
                  <a className="username">Writer</a> wrote a log · 1 seconds ago
                  <div className="option-button">
                      <a className="option-button" id="dropdown=button=id" data-activates="dropdown-id">
                          <i className="material-icons icon-button">more_vert</i>
                      </a>
                      <ul id='dropdown-id' className='dropdown-content'>
                          <li><a>Edit</a></li>
                          <li><a>Remove</a></li>
                      </ul>
                  </div>
              </div>
              <div className="card-content">
                  Contents
              </div>
              <div className="footer">
                  <i className="material-icons log-footer-icon start cion-button">star</i>
                  <span className="star-count">0</span>
              </div>
          </div>
      </div>
    );
  }

  componentDidUpdate() {
    // WHEN COMPONENT UPDATES, INITIALIZE DROPDOWN
    // (TRIGGERED WHEN LOGGED IN)
    $('#dropdown-button-'+this.props.data._id).dropdown({
      belowOrigin: true // Displays dropdown below the button
    });
  }

  componentDidMount() {
    // WHEN COMPONENT MOUNTS, INITIALIZE DROPDOWN
    // (TRIGGED WHEN REFRESHED)
    $('#dropdown-button'+this.props.data._id).dropdown({
      belowOrigin: true // Displays dropdown below the button
    });
  }
}

Memo.propTypes = {
  data: React.PropTypes.object,
  ownership: React.PropTypes.bool
};

Memo.defaultProps = {
  data: {
    _id: 'id1234567890',
    writer: 'Writer',
    contents: 'Contents',
    is_edited: false,
    date: {
      edited: new Date(),
      created: new Date()
    },
    starred: []
  },
  ownership: true
};

export default Memo;
