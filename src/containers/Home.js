import React from 'react';
import { connect } from 'react-redux';
import { Write, MemoList } from 'components';
import { memoPostRequest, memoListRequest } from 'actions/memo';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.handlePost = this.handlePost.bind(this);
    this.loadNewMemo = this.loadNewMemo.bind(this);
  }

  componentDidMount() {
    // LOAD NEW MEMO EVERY 5 SECONDS
    const loadMemoLoop = () => {
      this.loadNewMemo().then(
        () => {
          this.memoLoaderTimeoutID = setTimeout(loadMemoLoop, 5000);
        }
      );
    };

    this.props.memoListRequest(true).then(
      () => {
        // BEGIIN NEW MEMO LOADING LOOP
        loadMemoLoop();
      }
    );
  }

  componentWiillUnmount() {
    // STOPS THE loadMemoLoop
    clearTimeout(this.memoLoaderTimeoutID);
  }

  loadNewMemo() {
    // CANCEL IF THERE IS A PENDING REQUEST
    if(this.props.listStatus === 'WAITING')
          return new Promise((resolve, reject) => {
            resolve();
          });

          // IF PAGE IS EMPTY, DO THE INITIAL LOADING
          if(this.props.memoData.length === 0 )
            return this.props.memoListRequest(true);

          return this.props.memoListRequest(false, 'new', this.props.memoData[0]._id);
  }

  /* POST MEMO */
  handlePost(contents) {
    return this.props.memoPostRequest(contents).then(
      () => {
        if(this.props.postStatus.status === "SUCCESS") {
          // TRIGGER LOAD NEW MEMO
          this.loadNewMemo().then(
            () => {
              Materialize.toast('Success!', 2000);
            }
          );
        } else {
          /*
            ERROR CODES
              1: NOT LOGGED IN
              2: EMPTY CONTENTS
          */
          let $toastContent;
          switch(this.props.postStatus.error) {
            case 1:
              // IF NOT LOGGED IN, NOTIFY AND REFRESH AFTER
              $toastContent = $('<span style="color: #FFB4BA">You are not logged in</span>');
              Materialize.toast($toastContent, 2000);
              setTimeout(()=> {location.reload(false);}, 2000);
              break;
            case 2:
              $toastContent = $('<span style="color: #FFB4BA">Please write something</span>');
              Materialize.toast($toastContent, 2000);
              break;
            default:
              $toastContent = $('<span style="color: #FFB4BA">Something Broke</span>');
              Materialize.toast($toastContent, 2000);
              break;
          }
        }
      }
    );
  }
  render() {
      const write = (
        <Write
          onPost={this.handlePost}
          />
       );

    return (
      <div className="wrapper">
        { this.props.isLoggedIn ? write : undefined }
        <MemoList data={this.props.memoData} currentUser={this.props.currentUser}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.authentication.status.isLoggedIn,
    postStatus: state.memo.post,
    currentUser: state.authentication.status.currentUser,
    memoData: state.memo.list.data,
    listStatus: state.memo.list.status
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    memoPostRequest: (contents) => {
      return dispatch(memoPostRequest(contents));
    },
    memoListRequest: (isInitial, listType, id, username) => {
      return dispatch(memoListRequest(isInitial, listType, id, username));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
