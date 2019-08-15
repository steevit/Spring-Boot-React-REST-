package pl.steevit.rest.controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.temporal.IsoFields;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.*;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.steevit.rest.entity.Event;
import pl.steevit.rest.exceptions.EventNotFoundException;
import pl.steevit.rest.repo.EventRepository;

@RestController
public class EventController {
    
    private final EventRepository repository;
    
    private final EventResourceAssembler assembler;

    public EventController(EventRepository repository,
            EventResourceAssembler assembler) {
        this.repository = repository;
        this.assembler = assembler;
    }
    
    @GetMapping(value = "/events/week/{nr}", produces = "application/json; charset=UTF-8")
    @CrossOrigin(origins = "http://localhost:3000")
    List<Event> allInWeek(@PathVariable Integer nr) {
        
        List<Event> events = repository.findAllByWeek(nr);
        
        return events;
    }
    
    @GetMapping(value = "/events/{year}/{month}/{day}", produces = "application/json; charset=UTF-8")
    @CrossOrigin(origins = "http://localhost:3000")
    List<Event> allInDay(@PathVariable Integer year, @PathVariable Integer month, 
            @PathVariable Integer day) {
        
        LocalDate date = LocalDate.of(year, month, day);
        
        List<Event> events = repository.findAllByDay(date);
        
        return events;
    }

    @GetMapping(value = "/events", produces = "application/json; charset=UTF-8")
    @CrossOrigin(origins = "http://localhost:3000")
    Resources<Resource<Event>> all() {
        
        List<Resource<Event>> events = repository.findAllByOrderByDateAsc().stream()
                .map(assembler::toResource)
                .collect(Collectors.toList());
        
        return new Resources<>(events,
            linkTo(methodOn(EventController.class).all()).withSelfRel());
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/events")
    Event newEvent(@RequestBody Event newEvent) {
        if(newEvent.getDate()!= null) {
            System.out.println(newEvent.getDate());
            ZonedDateTime date = ZonedDateTime.of(newEvent.getDate(), LocalTime.of(0, 0) ,ZoneId.systemDefault());
            newEvent.setWeek(date.get(IsoFields.WEEK_OF_WEEK_BASED_YEAR));
            newEvent.setMonth(date.getMonthValue());
            newEvent.setYear(date.getYear());
        }
        
        System.out.println(newEvent.getDate());

        return repository.save(newEvent);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value = "/events/{id}", produces = "application/json; charset=UTF-8")
    Resource<Event> one(@PathVariable Long id) {

        Event event = repository.findById(id)
            .orElseThrow(() -> new EventNotFoundException(id));
        
        return assembler.toResource(event);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/events/{id}")
    Event replaceEvent(@RequestBody Event newEvent, @PathVariable Long id) {

        return repository.findById(id)
            .map(event -> {
                ZonedDateTime date = ZonedDateTime.of(newEvent.getDate(), LocalTime.of(0, 0) ,ZoneId.systemDefault());
                event.setName(newEvent.getName());
                event.setType(newEvent.getType());
                event.setDate(newEvent.getDate());
                event.setWeek(date.get(IsoFields.WEEK_OF_WEEK_BASED_YEAR));
                event.setMonth(date.getMonthValue());
                event.setYear(date.getYear());
                event.setDesc(newEvent.getDesc());
                return repository.save(event);
        })
            .orElseGet(() -> {
                newEvent.setId(id);
                return repository.save(newEvent);
        });
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/events/{id}")
    void deleteEvent(@PathVariable Long id) {
        repository.deleteById(id);
    }
    
}
