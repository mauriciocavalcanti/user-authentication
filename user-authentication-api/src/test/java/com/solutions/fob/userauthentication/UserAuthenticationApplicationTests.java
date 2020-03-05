package com.solutions.fob.userauthentication;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import java.time.LocalDate;
import java.util.HashMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JacksonJsonParser;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.web.FilterChainProxy;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.context.WebApplicationContext;
import com.solutions.fob.userauthentication.entity.UserEntity;
import com.solutions.fob.userauthentication.model.User;
import com.solutions.fob.userauthentication.repository.UserRepository;

@SpringBootTest
@ActiveProfiles("test")
@WebAppConfiguration
class UserAuthenticationApplicationTests {

  @Autowired
  private WebApplicationContext wac;

  @Autowired
  private FilterChainProxy springSecurityFilterChain;

  @Autowired
  private UserRepository userRepository;

  private MockMvc mockMvc;

  private static final String CLIENT_ID = "fob-client";
  private static final String CLIENT_SECRET = "fob-secret";
  private static final String SCOPE = "any";

  private static final String CONTENT_TYPE = "application/json;charset=UTF-8";
  private static boolean isInitialized;
  private static final String EMAIL = "email@email.com";
  private static final String EMAIL2 = "teste@teste.com";
  private static final String FIRST_NAME = "User";
  private static final String LAST_NAME = "Test";
  private static final String ID_CODE = "user1234";
  private static final String ID_CODE2 = "user12";
  private static final LocalDate BIRTH_DATE = LocalDate.of(1990, 03, 01);
  private static final String PASSWORD = "password";
  private static final String PASSWORD_ENCRYPTED =
      "$2a$10$iXtTrcTyzeRAO5hrdWDaFO9o4xtwNkK8GJvWu2xNEXYZNPmzx5/tW";
  private User user = new User(FIRST_NAME, LAST_NAME, ID_CODE, PASSWORD, EMAIL, BIRTH_DATE);
  private User user2 =
      new User(FIRST_NAME, LAST_NAME, ID_CODE2, PASSWORD_ENCRYPTED, EMAIL2, BIRTH_DATE);

  @BeforeEach
  public void setup() {
    this.mockMvc =
        MockMvcBuilders.webAppContextSetup(this.wac).addFilter(springSecurityFilterChain).build();
    if (!isInitialized) {
      userRepository.save(new UserEntity(user2));
      isInitialized = true;
    }

  }

  private HashMap<String, String> obtainTokens(String username, String password) throws Exception {
    final MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
    params.add("grant_type", "password");
    params.add("username", username);
    params.add("password", password);
    params.add("scope", SCOPE);

    ResultActions result = mockMvc
        .perform(post("/oauth/token").contentType(MediaType.APPLICATION_FORM_URLENCODED)
            .params(params).with(httpBasic(CLIENT_ID, CLIENT_SECRET)).accept(CONTENT_TYPE))
        .andExpect(status().isOk()).andExpect(content().contentType(CONTENT_TYPE));

    String resultString = result.andReturn().getResponse().getContentAsString();

    JacksonJsonParser jsonParser = new JacksonJsonParser();
    HashMap<String, String> tokens = new HashMap<>();
    tokens.put("access_token", jsonParser.parseMap(resultString).get("access_token").toString());
    tokens.put("refresh_token", jsonParser.parseMap(resultString).get("refresh_token").toString());
    return tokens;
  }

  private HashMap<String, String> refreshAccessToken(String refreshToken) throws Exception {
    final MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
    params.add("grant_type", "refresh_token");
    params.add("scope", SCOPE);
    params.add("refresh_token", refreshToken);

    ResultActions result = mockMvc
        .perform(post("/oauth/token").contentType(MediaType.APPLICATION_FORM_URLENCODED)
            .params(params).with(httpBasic(CLIENT_ID, CLIENT_SECRET)).accept(CONTENT_TYPE))
        .andExpect(status().isOk()).andExpect(content().contentType(CONTENT_TYPE));

    String resultString = result.andReturn().getResponse().getContentAsString();

    JacksonJsonParser jsonParser = new JacksonJsonParser();
    HashMap<String, String> tokens = new HashMap<>();
    tokens.put("access_token", jsonParser.parseMap(resultString).get("access_token").toString());
    tokens.put("refresh_token", jsonParser.parseMap(resultString).get("refresh_token").toString());
    return tokens;
  }

  @Test
  public void createUser() throws Exception {
    mockMvc.perform(post("/users").contentType(CONTENT_TYPE).content(user.toString()))
        .andExpect(status().isCreated());
  }

  @Test
  public void loginWithEmail() {
    try {
      String accessToken = this.obtainTokens(EMAIL2, PASSWORD).get("access_token");
      assertTrue(accessToken != null);
    } catch (Exception e) {
      assertTrue(false);
    }
  }

  @Test
  public void loginWithIdCode() {
    try {
      String accessToken = this.obtainTokens(ID_CODE2, PASSWORD).get("access_token");
      assertTrue(accessToken != null);
    } catch (Exception e) {
      assertTrue(false);
    }
  }

  @Test
  public void getUserLoggedIn() throws Exception {
    String accessToken = this.obtainTokens(EMAIL2, PASSWORD).get("access_token");
    mockMvc.perform(get("/users").header("Authorization", "Bearer " + accessToken))
        .andExpect(status().isOk());
  }

  @Test
  public void getUserLoggedInWithoutToken() throws Exception {
    mockMvc.perform(get("/users")).andExpect(status().isUnauthorized());
  }

  @Test
  public void refreshToken() throws Exception {
    HashMap<String, String> tokens = this.obtainTokens(EMAIL2, PASSWORD);
    String refreshed = this.refreshAccessToken(tokens.get("refresh_token")).get("access_token");
    assertTrue(!refreshed.equals(tokens.get("access_token")));
  }

  @Test
  public void logout() throws Exception {
    String accessToken = this.obtainTokens(EMAIL2, PASSWORD).get("access_token");
    mockMvc.perform(delete("/users/logout").header("Authorization", "Bearer " + accessToken))
        .andExpect(status().isOk());
  }

}
