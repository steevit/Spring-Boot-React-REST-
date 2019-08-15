package pl.steevit.rest.controller;

import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceAssembler;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;
import org.springframework.stereotype.Component;
import pl.steevit.rest.entity.Type;

@Component
public class TypeResourceAssembler implements ResourceAssembler<Type, Resource<Type>> {
    
    @Override
    public Resource<Type> toResource(Type type) {

      return new Resource<>(type,
        linkTo(methodOn(TypeController.class).one(type.getId())).withSelfRel(),
        linkTo(methodOn(TypeController.class).all()).withRel("types"));
    }
    
}
