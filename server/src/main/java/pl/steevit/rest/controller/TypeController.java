package pl.steevit.rest.controller;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.steevit.rest.entity.Type;
import pl.steevit.rest.exceptions.TypeNotFoundException;
import pl.steevit.rest.repo.TypeRepository;

@RestController
public class TypeController {
    
    private final TypeRepository repository;
    
    private final TypeResourceAssembler assembler;

    public TypeController(TypeRepository repository,
            TypeResourceAssembler assembler) {
        this.repository = repository;
        this.assembler = assembler;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value = "/types", produces = "application/json; charset=UTF-8")
    Resources<Resource<Type>> all() {
        
        List<Resource<Type>> types = repository.findAll().stream()
                .map(assembler::toResource)
                .collect(Collectors.toList());
        
        return new Resources<>(types,
            linkTo(methodOn(TypeController.class).all()).withSelfRel());
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/types")
    Type newType(@RequestBody Type newType) {
        return repository.save(newType);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value = "/types/{id}", produces = "application/json; charset=UTF-8")
    Resource<Type> one(@PathVariable Long id) {

        Type type = repository.findById(id)
            .orElseThrow(() -> new TypeNotFoundException(id));
        
        return assembler.toResource(type);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/types/{id}")
    Type replaceType(@RequestBody Type newType, @PathVariable Long id) {

        return repository.findById(id)
            .map(type -> {
                type.setName(newType.getName());
                return repository.save(type);
        })
            .orElseGet(() -> {
                newType.setId(id);
                return repository.save(newType);
        });
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/types/{id}")
    void deleteType(@PathVariable Long id) {
        repository.deleteById(id);
    }
    
}
