package com.example.Travelme.service;

import com.example.Travelme.entity.User;
import com.example.Travelme.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username);

        if (user == null)
            throw new UsernameNotFoundException("No user associated with email: " + username);

        return new org.springframework.security.core.userdetails.User
                (user.getEmail(), user.getPassword(), List.of((GrantedAuthority) user::getRole));
    }

}
