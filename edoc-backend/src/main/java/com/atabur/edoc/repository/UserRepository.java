package com.atabur.edoc.repository;

import com.atabur.edoc.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    User findByUsername(String username);

    boolean existsByUsername(String username);

}
