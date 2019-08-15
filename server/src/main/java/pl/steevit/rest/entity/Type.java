package pl.steevit.rest.entity;

import lombok.Data;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class Type {
    
    private @Id @GeneratedValue Long id;
    private String name;
    
}
