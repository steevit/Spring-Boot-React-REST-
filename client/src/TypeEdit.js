import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class TypeEdit extends Component {

  emptyItem = {
    name: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const type = await (await fetch(`http://localhost:8080/types/${this.props.match.params.id}`)).json();
      this.setState({item: type});
    }

  }

  handleChange(type) {
    const target = type.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  async handleSubmit(type) {
    type.preventDefault();
    const {item} = this.state;

    await fetch((item.id) ? `http://localhost:8080/types/${item.id}` : 'http://localhost:8080/types', {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/types');
  }

  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? 'Edycja typu' : 'Dodawanie typu'}</h2>;

    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="name">Nazwa</Label>
            <Input type="text" name="name" id="name" value={item.name || ''}
                   onChange={this.handleChange} autoComplete="name"/>
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Zapisz</Button>{' '}
            <Button color="secondary" tag={Link} to="/types">Anuluj</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(TypeEdit);