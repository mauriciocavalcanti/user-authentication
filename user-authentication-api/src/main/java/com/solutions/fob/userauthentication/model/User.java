package com.solutions.fob.userauthentication.model;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collection;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class User implements UserDetails {

  private static final long serialVersionUID = 2050613303820441027L;

  private Long id;

  private String firstName;

  private String lastName;

  private String idCode;

  private String password;

  private String email;

  private LocalDate birthDate;
  
  public User() {}
  
  public User(String firstName, String lastName, String idCode, String password, String email,
      LocalDate birthDate) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.idCode = idCode;
    this.password = password;
    this.email = email;
    this.birthDate = birthDate;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return Arrays.asList(new SimpleGrantedAuthority("ROLE_ADMIN"));
  }

  @Override
  public String getUsername() {
    return getEmail();
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getIdCode() {
    return idCode;
  }

  public void setIdCode(String idCode) {
    this.idCode = idCode;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public LocalDate getBirthDate() {
    return birthDate;
  }

  public void setBirthDate(LocalDate birthDate) {
    this.birthDate = birthDate;
  }

  @Override
  public String toString() {
    return "{\"id\":\"" + id + "\",\"firstName\":\"" + firstName + "\",\"lastName\":\"" + lastName + "\",\"idCode\":\""
        + idCode + "\",\"password\":\"" + password + "\",\"email\":\"" + email + "\",\"birthDate\":\"" + birthDate + "\"}";
  }

}
