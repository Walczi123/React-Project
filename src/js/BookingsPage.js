import React from 'react';
import Booking from './Booking'
import { withRouter } from "react-router-dom";
import { Icon } from "semantic-ui-react"
import '../css/BookingsPage.css'
import InfiniteScroll from 'react-infinite-scroller';

class Bookings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: [],
      bookingIdAsc: false,
      userIdAsc: null,
      userNameAsc: null,
      itemIdAsc: null,
      startDateAsc: null,
      isLoading: false,
      pageNumber: 1,

      //test
      testBookings: [],
      testNextPage: 1,
      testHasMoreItems: true
    }
    this.loadBookings = this.loadBookings.bind(this);
    this.ElementXD = this.ElementXD.bind(this);
    this.handlerBID = this.handlerBID.bind(this);
    this.handlerSD = this.handlerSD.bind(this);
    this.handlerUId = this.handlerUId.bind(this);
    this.hanlderIID = this.hanlderIID.bind(this);
    this.hanlderUName = this.hanlderUName.bind(this);
    //this.componentDidMount = this.componentDidMount.bind(this);

    //test
    this.testLoadItems = this.testLoadItems.bind(this);
    this.sortInfiteScroll = this.sortInfiteScroll.bind(this);
  }

  getCookieValue = (key) => {
    return document.cookie.replace(`/(?:(?:^|.*;\s*)${key}\s*\=\s*([^;]*).*$)|^.*$/, "$1"`).split("=")[1];
  }

  // componentDidMount() {
  //   if (this.getCookieValue("token") === undefined) {
  //     this.props.history.push("/");
  //     return;
  //   }
  //   //console.log("cookie 'token' value: ", this.getCookieValue("token"))
  //   this.loadBookings();
  // }

  loadBookings() {
    this.setState({
      isLoading: true
    });

    fetch(`http://minibookly.us-east-1.elasticbeanstalk.com/bookings?pageSize=${11}&pageNumber=${this.state.pageNumber}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.getCookieValue('token')}`
      }
    })
      .then(response => {
        //console.log(response.status)
        return response.json();
      })
      .then(data => this.setState({ bookings: data.bookingForms }))
      .then(() => this.setState({ isLoading: false }));

  }

  // helper function for sorting
  mySort = (a, b, cond) => {
    if (!cond)
      return a < b ? 1 : -1;
    else {
      return a > b ? 1 : -1;
    }
  }

  // sorting by booking id handler
  handlerBID = () => {
    if (!this.state.bookings) {
      return;
    }
    if (this.state.bookingIdAsc === null) {
      this.state.bookingIdAsc = true; // i know this is stupid but it works (same for all sorting handlers)
    }
    var sorted = this.state.bookings.sort((a, b) => this.mySort(a.id, b.id, this.state.bookingIdAsc))
    this.setState(prevstate => ({
      bookings: sorted,
      bookingIdAsc: !prevstate.bookingIdAsc,
      userIdAsc: null,
      userNameAsc: null,
      itemIdAsc: null,
      startDateAsc: null,
    }))
    // console.log("booking id: ", this.state.bookingIdAsc))
  }

  // sorting by user id handler
  handlerUId = () => {
    if (!this.state.bookings) {
      return;
    }
    if (this.state.userIdAsc === null) {
      this.state.userIdAsc = true; // check handlerBID
    }
    var sorted = this.state.bookings.sort((a, b) => this.mySort(a.owner, b.owner, this.state.userIdAsc))
    this.setState(prevstate => ({
      bookings: sorted,
      userIdAsc: !prevstate.userIdAsc,
      bookingIdAsc: null,
      userNameAsc: null,
      itemIdAsc: null,
      startDateAsc: null,
    }))
    // console.log("User id: ", this.state.userIdAsc))
  }
  // sorting by user name handler  
  hanlderUName = () => {
    if (!this.state.bookings) {
      return;
    }
    if (this.state.userNameAsc === null) {
      this.state.userNameAsc = true; // check handlerBID
    }
    var sorted = this.state.bookings.sort((a, b) => this.mySort(a.username, b.username, this.state.userNameAsc))
    this.setState(prevstate => ({
      bookings: sorted,
      userNameAsc: !prevstate.userNameAsc,
      bookingIdAsc: null,
      userIdAsc: null,
      itemIdAsc: null,
      startDateAsc: null,
    }))
    // cnsole.log("user name: ", this.state.userNameAsc))
  }
  // sorting by item id handler
  hanlderIID = () => {
    if (!this.state.bookings) {
      return;
    }
    if (this.state.itemIdAsc === null) {
      this.state.itemIdAsc = true; // check handlerBID
    }
    var sorted = this.state.bookings.sort((a, b) => this.mySort(a.itemId, b.itemId, this.state.itemIdAsc))
    this.setState(prevstate => ({
      bookings: sorted,
      itemIdAsc: !prevstate.itemIdAsc,
      bookingIdAsc: null,
      userIdAsc: null,
      userNameAsc: null,
      startDateAsc: null,
    }))
    // console.log("item id:", this.state.itemIdAsc))
  }
  // sorting by start date handler
  handlerSD = () => {
    if (!this.state.bookings) {
      return;
    }
    if (this.state.startDateAsc === null) {
      this.state.startDateAsc = true; // check handlerBID
    }
    var sorted = this.state.bookings.sort((a, b) => this.mySort(a.startDateTime, b.startDateTime, this.state.startDateAsc))
    this.setState(prevstate => ({
      bookings: sorted,
      startDateAsc: !prevstate.startDateAsc,
      bookingIdAsc: null,
      userIdAsc: null,
      userNameAsc: null,
      itemIdAsc: null,
    }))
    // console.log("start date", this.state.startDateAsc))
  }

  ElementXD = (value, hanlder, cond, sortable) => {
    if (sortable) {
      return (
        <div className="col-md-3 text-left Clickable" onClick={hanlder}>
          {value}
          {cond === null ? <div></div>
            : cond ? <Icon name='caret down' style={{}} />
              : <Icon name='caret up' style={{}} />}
        </div>
      )
    }
    else {
      return (
        <div className="col-md-3 text-left">
          {value}
        </div>
      )
    }
  }

  //fetch(`http://minibookly.us-east-1.elasticbeanstalk.com/bookings?pageSize=${5}&pageNumber=${this.state.testNextPage}`, {
  // http://localhost:3004/bookings?_page=0&_limit=10

  // fetching used in infinite scroll component
  testLoadItems() {
    console.log("XD")
    fetch(`http://minibookly.us-east-1.elasticbeanstalk.com/bookings?pageSize=${10}&pageNumber=${this.state.testNextPage}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.getCookieValue('token')}`
      }
    })
      .then(response => {
        // console.log(response.status)
        return response.json();
      })
      .then(data => {
        var testNewState = this.sortInfiteScroll(this.state.bookings.concat(data.bookingForms))
        //console.log(this.sortInfiteScroll(this.state.bookings.concat(data.bookingForms)));
        this.setState(prevstate => ({
          bookings: testNewState,
          testHasMoreItems: data.isNext,
          testNextPage: prevstate.testNextPage + 1
        }))
      })
  }

  // sort new data handler
  sortInfiteScroll = (bookings) => {
    if (this.state.bookingIdAsc !== null) {
      console.log(this.state.bookingIdAsc)
      if (this.state.bookingIdAsc) {
        return bookings.sort((a, b) => this.mySort(a.id, b.id, !this.state.bookingIdAsc));
      } else {
        return bookings;
      }
    } else if (this.state.userIdAsc !== null) {
      if (this.state.userIdAsc) {
        return bookings.sort((a, b) => this.mySort(a.owner, b.owner, !this.state.userIdAsc));
      } else {
        return bookings.sort((a, b) => this.mySort(a.owner, b.owner, !this.state.userIdAsc));
      }
    } else if (this.state.userNameAsc !== null) {
      if (this.state.userNameAsc) {
        return bookings.sort((a, b) => this.mySort(a.username, b.username, !this.state.userNameAsc));
      } else {
        return bookings.sort((a, b) => this.mySort(a.username, b.username, !this.state.userNameAsc));
      }
    } else if (this.state.itemIdAsc !== null) {
      if (this.state.itemIdAsc) {
        return bookings.sort((a, b) => this.mySort(a.itemId, b.itemId, !this.state.itemIdAsc));
      } else {
        return bookings.sort((a, b) => this.mySort(a.itemId, b.itemId, !this.state.itemIdAsc));
      }
    } else if (this.state.startDateAsc !== null) {
      if (this.state.startDateAsc) {
        return bookings.sort((a, b) => this.mySort(a.startDateTime, b.startDateTime, !this.state.startDateAsc));
      } else {
        return bookings.sort((a, b) => this.mySort(a.startDateTime, b.startDateTime, !this.state.startDateAsc));
      }
    } else {
      return;
    }
  }

  render() {
    const header = (
      <div className="card bg-primary text-white cardBP">
        <div className="card-header">
          <div className="row">
            <div className="col-md-6">
              <div className="row">
                {this.ElementXD("Booking id", this.handlerBID, this.state.bookingIdAsc, 1)}
                {this.ElementXD("User id", this.handlerUId, this.state.userIdAsc, 1)}
                {this.ElementXD("Name", this.hanlderUName, this.state.userNameAsc, 1)}
                {this.ElementXD("Item id", this.hanlderIID, this.state.itemIdAsc, 1)}
              </div>
            </div>
            <div className="col-md-6">
              <div className="row">
                {this.ElementXD("Item type", null, null, 0)}
                <div className="col-md-3 text-left">
                  Item info
                  <Icon name='info circle' className="infoIcon" onClick={() => alert("Click booking for detials;\n\nItem info for specific items:\n\nCar: Plate number\nFlat: Address\nParking: Street ParkingNumber")} />
                </div>
                {this.ElementXD("Active", null, null, 0)}
                {this.ElementXD("Start date", this.handlerSD, this.state.startDateAsc, 1)}
              </div>
            </div>
          </div>
        </div>
      </div>
    )

    const loader = (
      <div className="spinner-border text-primary " style={{ clear: "both" }}></div>
    )

    if (this.state.bookings) {
      var items = [];
      this.state.bookings.map(booking => {
        items.push(
          <Booking booking={booking} key={booking.id} />
        )
      })
      //console.log(this.state.testBookings)
      var cond = this.state.startDateAsc || this.state.itemIdAsc || this.state.userNameAsc || this.state.userIdAsc || this.state.bookingIdAsc;
      const testListBookings = (
        <InfiniteScroll
          loadMore={this.testLoadItems}
          hasMore={this.state.testHasMoreItems}
          loader={loader}
          threshold={cond ? 5 : 0}
          isReverse={cond}>
          {items}
        </InfiniteScroll>
      )
      return (
        <div>
          {header}
          {testListBookings}
        </div>
      )
    } else {
      return <div>Unexpected error!</div>
    }

  }
}

export default withRouter(Bookings)