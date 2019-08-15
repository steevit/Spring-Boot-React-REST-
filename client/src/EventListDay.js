import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column'
  },
  title: {
    fontSize: 20,
    textAlign: 'center'
  },
  section: {
    margin: 10,
    padding: 10,
    
  }
});

class EventListDay extends Component {

  state = {
    isLoading: true,
    events: []
  };

  constructor(props) {
    super(props);
    this.remove = this.remove.bind(this);
  }

  async componentDidMount() {
        const items = await(await fetch(`http://localhost:8080/events/${this.props.match.params.year}/${this.props.match.params.month}/${this.props.match.params.day}`)).json();
        this.setState({events : items});
        console.log(this.props.match.params.nr);
        console.log(this.events);
        this.setState({isLoading: false});
  }

  async remove(id) {
    await fetch(`http://localhost:8080/events/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedEvents = [...this.state.events].filter(i => i.id !== id);
      this.setState({events: updatedEvents});
    });
  }

  render() {
    const {events, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const eventList = events.map(event => {
      return <tr key={event.id}>
        <td style={{whiteSpace: 'nowrap'}}>{event.name}</td>
        <td>
          {event.type!=null ? event.type.name : event.type}
        </td> 
        <td>{event.date}</td>
        <td>{event.week}</td>
        <td>{event.month}</td>
        <td>{event.year}</td>
        <td>{event.desc}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/events/" + event.id}>Info</Button>
            <Button size="sm" color="info" tag={Link} to={"/events/edit/" + event.id}>Edytuj</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(event.id)}>Usuń</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    const eventListForPdf = events.map(event => {
      return <Text>
        {event.name} -- {event.type!=null ? event.type.name : event.type} -- {event.date} -- {event.desc}
      </Text>
    });

    const MyDocument = () => (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.title}>Wydarzenia w Bialymstoku</Text>
          </View>  
          <View style={styles.section}>
              {eventListForPdf}
          </View>
        </Page>
      </Document>
    );

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <PDFDownloadLink document={<MyDocument />} fileName="events.pdf">Drukuj PDF</PDFDownloadLink>
            &nbsp;&nbsp;&nbsp;
            <Button color="success" tag={Link} to="/events/edit/new">Dodaj wydarzenie</Button>
          </div>
          <h3>Wydarzenia</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th>Nazwa</th>
              <th>Typ</th>
              <th>Data</th>
              <th>Tydzień</th>
              <th>Miesiąc</th>
              <th>Rok</th>
              <th>Opis</th>
              <th>Akcje</th>
            </tr>
            </thead>
            <tbody>
            {eventList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default EventListDay;