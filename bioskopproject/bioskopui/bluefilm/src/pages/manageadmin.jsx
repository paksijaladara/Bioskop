import React, { Component } from "react";
import Axios from "axios";
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow
} from "@material-ui/core";
import { APIURL } from "../support/ApiUrl";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
// import { withStyle, makeStyle } from "@material-ui/core";

class ManageAdmin extends Component {
  state = {
    datafilm: [],
    readmoreselected: false,
    modaladd: false
  };
  componentDidMount() {
    Axios.get(`${APIURL}movies`)
      .then(res => {
        this.setState({ datafilm: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  splitini = (a = "") => {
    var b = a.split("").filter((val, index) => index <= 50);
    return b;
  };
  onSaveAddDataClick = () => {
    var jadwal = [12, 14, 16, 18, 20];
    var jadwaltemplate = [];
    for (var i = 0; i < jadwaltemplate.length; i++) {
      if (this.refs[`jadwal${i}`].checked) {
        jadwal.push(jadwaltemplate[i]);
      }
    }
    const { iniref } = this.refs;
    var title = iniref.title.value;
    var image = iniref.image.value;
    var synopsys = iniref.synopsys.value;
    var sutradara = iniref.sutradara.value;
    var genre = iniref.genre.value;
    var durasi = iniref.durasi.value;
    var produksi = "jaladara entertainment";
    var data = {
      title: title,
      sutradara,
      durasi,
      jadwal,
      synopsys,
      image,
      genre,
      produksi
    };
    Axios.post(`${APIURL}movies`, data)
      .then(res => {
        Axios.get(`${APIURL}movies`).then(res => {
          this.setState({ datafilm: res.data, modaladd: false });
        });
      })
      .catch(err => {
        console.log(err);
      });
    {
    }
  };
  renderMovies = () => {
    return this.state.datafilm.map((val, index) => {
      return (
        <TableRow key={index}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{val.title}</TableCell>
          <TableCell>
            <img src={val.image} alt={"gambar"} height="200px" />
          </TableCell>
          {this.state.readmoreselected === index ? (
            <TableCell>
              {val.synopsys}
              <span
                style={{ color: "red" }}
                onClick={() => this.setState({ readmoreselected: -1 })}
              >
                Read less
              </span>
            </TableCell>
          ) : (
            <TableCell>
              {this.splitini(val.synopsys)}
              <span onClick={() => this.setState({ readmoreselected: index })}>
                Read more
              </span>
            </TableCell>
          )}
          <TableCell>{val.jadwal}</TableCell>
          <TableCell>{val.sutradara}</TableCell>
          <TableCell>{val.genre}</TableCell>
          <TableCell>{val.durasi}</TableCell>
          <TableCell>
            <button className="btn btn-outline-primary">Edit</button>
            <button className="btn btn-outline-danger">Delete</button>
          </TableCell>
        </TableRow>
      );
    });
  };
  render() {
    return (
      <div className="mx-3">
        <Modal
          isOpen={(this, this.state.modaladd)}
          toggle={() => this.setState({ modaladd: false })}
        >
          <ModalHeader>Add data</ModalHeader>
          <ModalBody>
            <input
              type="text"
              ref="title"
              placeholder="title"
              className="form-control"
            />
            <input
              type="text"
              ref="image"
              placeholder="image"
              className="form-control"
            />
            <input
              type="text"
              ref="synopsys"
              placeholder="synopsys"
              className="form-control"
            />
            Jadwal:
            <input type="checkbox" ref="jadwal0" />
            12.00
            <input type="checkbox" ref="jadwal1" />
            14.00
            <input type="checkbox" ref="jadwal2" />
            16.00
            <input type="checkbox" ref="jadwal3" />
            18.00
            <input type="checkbox" ref="jadwal4" />
            20.00
            <input
              type="text"
              ref="sutradara"
              placeholder="sutradara"
              className="form-control"
            />
            <input
              type="text"
              ref="durasi"
              placeholder="durasi"
              className="form-control"
            />
            <input
              type="text"
              ref="genre"
              placeholder="genre"
              className="form-control"
            />
          </ModalBody>
          <ModalFooter>
            <button>Save</button>
            <button onClick={() => this.setState({ modaladd: false })}>
              Cancel
            </button>
          </ModalFooter>
        </Modal>
        <button
          className="btn btn-success"
          onClick={() => this.setState({ modaladd: true })}
        >
          Add data
        </button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Judul</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Synopsis</TableCell>
              <TableCell>Jadwal</TableCell>
              <TableCell>Sutradara</TableCell>
              <TableCell>Genre</TableCell>
              <TableCell>Durasi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{this.renderMovies()}</TableBody>
        </Table>
      </div>
    );
  }
}

export default ManageAdmin;
