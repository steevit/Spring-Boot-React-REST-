package pl.steevit.rest.controller;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.*;

import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceAssembler;
import org.springframework.stereotype.Component;
import pl.steevit.rest.entity.Event;


@Component
public class EventResourceAssembler implements ResourceAssembler<Event, Resource<Event>> {
    
    @Override
    public Resource<Event> toResource(Event event) {

      return new Resource<>(event,
        linkTo(methodOn(EventController.class).one(event.getId())).withSelfRel(),
        linkTo(methodOn(EventController.class).all()).withRel("events"));
    }

}