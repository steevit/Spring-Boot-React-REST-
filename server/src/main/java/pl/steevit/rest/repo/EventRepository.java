package pl.steevit.rest.repo;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.steevit.rest.entity.Event;

public interface EventRepository extends JpaRepository<Event, Long> {
    
    public List<Event> findAllByOrderByDateAsc();
    
    @Query("select e from Event e "
        + "where (e.week=:week) order by date asc")
    public List<Event> findAllByWeek(@Param("week") Integer week);
    
    @Query("select e from Event e "
        + "where e.date like:date order by date asc")
    public List<Event> findAllByDay(@Param("date") LocalDate date);

}
