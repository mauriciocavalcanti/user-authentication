package com.solutions.fob.userauthentication.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.provider.token.ConsumerTokenServices;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.solutions.fob.userauthentication.model.User;
import com.solutions.fob.userauthentication.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

  @Autowired
  private UserService userService;

  @Autowired
  private BCryptPasswordEncoder passwordEncoder;

  @Resource(name = "tokenServices")
  ConsumerTokenServices tokenServices;

  @PostMapping(value = "")
  public ResponseEntity<Object> postUser(@Valid @RequestBody User user) {
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    try {
      user = userService.postUser(user);
      return new ResponseEntity<>(user, HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }
  }

  @GetMapping(value = "")
  public ResponseEntity<User> getUser() {
    return new ResponseEntity<>(userService.getUser(SecurityContextHolder.getContext()),
        HttpStatus.OK);
  }

  @DeleteMapping(value = "/logout")
  @ResponseBody
  public void logout(HttpServletRequest request) {
    String authorization = request.getHeader("Authorization");
    if (authorization != null && authorization.contains("Bearer")) {
      String tokenId = authorization.substring("Bearer".length() + 1);
      tokenServices.revokeToken(tokenId);
    }
  }

}
