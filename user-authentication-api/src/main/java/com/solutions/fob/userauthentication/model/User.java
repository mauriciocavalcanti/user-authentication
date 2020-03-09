package com.solutions.fob.userauthentication.model;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Collection;
import javax.validation.constraints.NotNull;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

public class User implements UserDetails {

  private static final long serialVersionUID = 2050613303820441027L;

  private Long id;

  @NotNull
  private String firstName;

  @NotNull
  private String lastName;

  @NotNull
  private String idCode;

  @NotNull
  @JsonProperty(access = Access.WRITE_ONLY)
  private String password;

  @NotNull
  private String email;

  @NotNull
  @JsonFormat(pattern = "dd/MM/yyyy")
  private LocalDate birthDate;
  
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
  
  public User() {}

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
        + idCode + "\",\"password\":\"" + password + "\",\"email\":\"" + email + "\",\"birthDate\":\"" + birthDate.format(DateTimeFormatter.ofPattern("dd/MM/yyyy")) + "\"}";
  }

  @Override
  public int hashCode() {
    final int prime = 31;
    int result = 1;
    result = prime * result + ((birthDate == null) ? 0 : birthDate.hashCode());
    result = prime * result + ((email == null) ? 0 : email.hashCode());
    result = prime * result + ((firstName == null) ? 0 : firstName.hashCode());
    result = prime * result + ((id == null) ? 0 : id.hashCode());
    result = prime * result + ((idCode == null) ? 0 : idCode.hashCode());
    result = prime * result + ((lastName == null) ? 0 : lastName.hashCode());
    result = prime * result + ((password == null) ? 0 : password.hashCode());
    return result;
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj)
      return true;
    if (obj == null)
      return false;
    if (getClass() != obj.getClass())
      return false;
    User other = (User) obj;
    if (birthDate == null) {
      if (other.birthDate != null)
        return false;
    } else if (!birthDate.equals(other.birthDate))
      return false;
    if (email == null) {
      if (other.email != null)
        return false;
    } else if (!email.equals(other.email))
      return false;
    if (firstName == null) {
      if (other.firstName != null)
        return false;
    } else if (!firstName.equals(other.firstName))
      return false;
    if (id == null) {
      if (other.id != null)
        return false;
    } else if (!id.equals(other.id))
      return false;
    if (idCode == null) {
      if (other.idCode != null)
        return false;
    } else if (!idCode.equals(other.idCode))
      return false;
    if (lastName == null) {
      if (other.lastName != null)
        return false;
    } else if (!lastName.equals(other.lastName))
      return false;
    if (password == null) {
      if (other.password != null)
        return false;
    } else if (!password.equals(other.password))
      return false;
    return true;
  }

}
