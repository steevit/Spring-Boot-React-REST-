import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class EventEdit extends Component {

  emptyItem = {
    name: '',
    type: [],
    date: '',
    desc: ''
  };

  state = {
    item: [],
    types: []
  };

  constructor(props) {
    super(props);
    this.setState({
      item: this.emptyItem,
    });
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const event = await (await fetch(`http://localhost:8080/events/${this.props.match.params.id}`)).json();
      this.setState({item: event});
    }

    const json = await(await fetch(`http://localhost:8080/types`)).json();
    if(json._embedded ? this.setState({types : json._embedded.typeList}) : this.setState({types : []}));
    this.setState({isLoading: false});

  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;

    if(item.type!=null) {
        item.type = await (await fetch(`http://localhost:8080/types/${item.type}`)).json()
    }

    await fetch((item.id) ? `http://localhost:8080/events/${item.id}` : 'http://localhost:8080/events', {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/events');
  }

  render() {
    const {types, item} = this.state;
    const title = <h2>{item.id ? 'Edycja wydarzenia' : 'Dodawanie wydarzenia'}</h2>;

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
            <Label for="type">Typ</Label>
            <Input type="select" name="type" id="type" onChange={this.handleChange}>
                <option value="" key="0" />
                {types
                      ? types.map(type => (
                          <option value={type.id} key={type.id}>
                            {type.name}
                          </option>
                        ))
                      : null}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="date">Data</Label>
            <Input type="date" name="date" id="date" value={item.date || ''}
                   onChange={this.handleChange} autoComplete="date"/>
          </FormGroup>
          <FormGroup>
              <Label for="desc">Opis</Label>
              <Input type="textarea" name="desc" id="desc" value={item.desc || ''}
                   onChange={this.handleChange} autoComplete="desc"/>
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Zapisz</Button>{' '}
            <Button color="secondary" tag={Link} to="/events">Anuluj</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(EventEdit);