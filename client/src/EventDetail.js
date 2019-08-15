import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class EventDetail extends Component {

    emptyItem = {
        name: '',
        type: [],
        date: '',
        desc: ''
      };

    state = {
        item: []
    };

  constructor(props) {
    super(props);
    this.setState({
        item: this.emptyItem,
      });
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
        const event = await (await fetch(`http://localhost:8080/events/${this.props.match.params.id}`)).json();
        this.setState({item: event});
      }
  }

  remove(id) {
    console.log(id);
    fetch(`http://localhost:8080/events/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
        this.props.history.push('/events');
    });
  }

  render() {
    const {item} = this.state;

    

    const eventDetail = (item) => {
      return <Table className="table mt-4">
        <tbody>
        <tr>
            <th scope="col">Typ</th>
            <td>
                {item.type!=null ? item.type.name : item.type}
            </td>
        </tr>
        <tr>
            <th scope="col">Data</th>
            <td>{item.date}</td>    
        </tr>
        <tr>
            <th scope="col">Opis</th>
            <td>{item.desc}</td>
        </tr> 
        <tr key={item.id}>
          <ButtonGroup>
            <Button size="sm" color="info" tag={Link} to={"/events/edit/" + item.id}>Edytuj</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(item.id)}>Usuń</Button>
          </ButtonGroup>
        </tr>
      </tbody>
      </Table>
    };

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <h3>{item.name}</h3>
          {eventDetail(item)}
        </Container>
      </div>
    );
  }
}

export default EventDetail;