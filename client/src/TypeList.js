import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class TypeList extends Component {

  state = {
    isLoading: true,
    types: []
  };

  constructor(props) {
    super(props);
    this.remove = this.remove.bind(this);
  }

  async componentDidMount() {
    this.setState({isLoading: true});

    const json = await(await fetch(`http://localhost:8080/types`)).json();
    if(json._embedded ? this.setState({types : json._embedded.typeList}) : this.setState({types : []}));
    this.setState({isLoading: false});
  }

  async remove(id) {
    await fetch(`http://localhost:8080/types/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedTypes = [...this.state.types].filter(i => i.id !== id);
      this.setState({types: updatedTypes});
    });
  }

  render() {
    const {types, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const typeList = types.map(type => {
      return <tr key={type.id}>
        <td style={{whiteSpace: 'nowrap'}}>{type.name}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="info" tag={Link} to={"/types/" + type.id}>Edytuj</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(type.id)}>Usuń</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/types/new">Dodaj typ</Button>
          </div>
          <h3>Typy</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th>Nazwa</th>
              <th>Akcje</th>
            </tr>
            </thead>
            <tbody>
            {typeList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default TypeList;