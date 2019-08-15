package pl.steevit.rest.entity;

import java.time.LocalDate;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;

@Data
@Entity
public class Event {

    private @Id @GeneratedValue Long id;
    private String name;
    private @ManyToOne Type type;
    private LocalDate date;
    private Integer week;
    private Integer month;
    private Integer year;
    private @Lob String desc;
    
}