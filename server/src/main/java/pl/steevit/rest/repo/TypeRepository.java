package pl.steevit.rest.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.steevit.rest.entity.Type;

public interface TypeRepository extends JpaRepository<Type, Long> {

}