package com.solutions.fob.userauthentication.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.solutions.fob.userauthentication.entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
  
  UserEntity findByEmailOrIdCode(String email, String idCode);

}
