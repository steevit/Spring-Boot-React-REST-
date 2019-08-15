package pl.steevit.rest.exceptions;

public class TypeNotFoundException extends RuntimeException {
    
    public TypeNotFoundException(Long id) {
        super("Could not find type with id: " + id);
    }
    
}