package com.solutions.fob.userauthentication.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.solutions.fob.userauthentication.entity.UserEntity;
import com.solutions.fob.userauthentication.model.User;
import com.solutions.fob.userauthentication.repository.UserRepository;

@Service
public class UserService implements UserDetailsService {

  @Autowired
  private UserRepository userRepository;
  
  @Autowired
  private ModelMapper modelMapper;

  @Override
  public UserDetails loadUserByUsername(String s) {
    UserEntity userEntity = userRepository.findByEmailOrIdCode(s, s);
    if (userEntity == null) {
      throw new UsernameNotFoundException("Invalid username or password.");
    }
    return modelMapper.map(userEntity, User.class);
  }
  
  public User postUser(User user) {
    UserEntity entity = new UserEntity(user);
    return modelMapper.map(userRepository.save(entity), User.class);
  }

  public User getUser(SecurityContext securityContext) {
    return (User) securityContext.getAuthentication().getPrincipal();
  }

}
