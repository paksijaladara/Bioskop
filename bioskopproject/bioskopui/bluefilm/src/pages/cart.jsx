import React, { Component } from "react";
import Axios from "axios";
import { connect } from "react-redux";
import { Table, Modal, ModalHeader, ModalBody } from "reactstrap";
import { APIURL } from "./../support/ApiUrl";

class Cart extends Component {
  state = {
    datacart: null,
    modaldetail: false,
    indexdetail: 0
  };
  componentDidMount() {
    Axios.get(
      `${APIURL}orders?_expand=movie&userId=${this.props.UserId}&bayar=false`
    )
      .then(res => {
        var datacart = res.data;
        // this.setState({ datacart: res.data });
        var qtyarr = [];
        res.data.forEach(element => {
          qtyarr.push(
            Axios.get(`${APIURL}ordersDetails?orderId=${element.id}`)
          );
        });

        var qtyarrfinal = [];
        Axios.all(qtyarr)
          .then(res1 => {
            res1.forEach(val => {
              qtyarrfinal.push(val.data);
            });
            console.log("qtyarrfinal", qtyarrfinal);
            var datafinal = [];
            datacart.forEach((val, index) => {
              datafinal.push({ ...val, qty: qtyarrfinal[index] });
            });
            this.setState({
              datacart: datafinal
            });
          })
          .catch(err => {});
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderCart = () => {
    if (this.state.datacart !== null) {
      // if (this.state.datacart.length === 0) {
      //   return (
      //     <tr>
      //       <td>belum ada barang di Cart</td>
      //     </tr>
      //   );
      // }
      return this.state.datacart.map((val, index) => {
        return (
          <tr key={index}>
            <td style={{ width: 100 }}>{index + 1}</td>
            <td style={{ width: 300 }}>{val.movie.title}</td>
            <td style={{ width: 100 }}>{val.jadwal}.00</td>
            <td style={{ width: 100, textAlign: "center" }}>
              {val.qty.length}
            </td>
            <td style={{ width: 100 }}>
              <button
                onClick={() =>
                  this.setState({ modaldetail: true, indexdetail: index })
                }
                className="btn btn-info"
              >
                Detail
              </button>
            </td>
          </tr>
        );
      });
    }
  };

  render() {
    // console.log("tes", this.state.datacart);
    if (this.props.UserId) {
      return (
        <div>
          <center>
            <Modal
              isOpen={this.state.modaldetail}
              toggle={() => this.setState({ modaldetail: false })}
            >
              <ModalHeader>Details</ModalHeader>
              <ModalBody>
                <Table>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Seat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.datacart !== null &&
                    this.state.datacart.length !== 0
                      ? this.state.datacart[this.state.indexdetail].qty.map(
                          (val, index) => {
                            return (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                  {`ABCDEFGHIJKLMNOPQRSTUVWXYZ`[val.row] +
                                    (val.seat + 1)}
                                </td>
                              </tr>
                            );
                          }
                        )
                      : null}
                  </tbody>
                </Table>
              </ModalBody>
            </Modal>
            <Table style={{ width: 600 }}>
              <thead>
                <tr>
                  <th style={{ width: 100 }}>No</th>
                  <th style={{ width: 300 }}>Title</th>
                  <th style={{ width: 100 }}>Jadwal</th>
                  <th style={{ width: 100 }}>Quantity</th>
                  <th style={{ width: 100 }}>Detail</th>
                </tr>
              </thead>
              <tbody>{this.renderCart()}</tbody>
              <tfoot>{/* <button>Checkout</button> */}</tfoot>
            </Table>
          </center>
        </div>
      );
    }
    return <div> 404 not found </div>;
  }
}

const MapstateToprops = state => {
  return {
    AuthLog: state.Auth.login,
    UserId: state.Auth.id
  };
};

export default connect(MapstateToprops)(Cart);
