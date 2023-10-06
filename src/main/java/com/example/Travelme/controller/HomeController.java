package com.example.Travelme.controller;

import com.example.Travelme.entity.User;

import com.example.Travelme.repository.UserRepository;
import com.example.Travelme.utils.ValidationUtils;
import jakarta.validation.Valid;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class HomeController {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    HomeController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/")
    public String home() {
        return "index.html";
    }

    @GetMapping("/map")
    public String map() {
        return "map.html";
    }

    @GetMapping("/blog")
    public String blog(){ return "blog_home.html";}

    @GetMapping("/editor")
    public String editor(){ return "blog_editor.html";}

    @GetMapping("/blogg")
    public String blogg(){ return "blog.html";}

    @GetMapping("/hill")
    public String hill(){ return "hill.html";}

    @GetMapping("/profile")
    public String profile(){ return "profile.html";}

    @GetMapping("/upload")
    public String upload(){return  "gallery.html";}

    @GetMapping("/galleryhome")
    public String galleryhome(){ return "gallery_home.html";}

    @GetMapping("/register")
    public String register(User user, Model model) {
        model.addAttribute("user", user);

        return "register.html";
    }

    @PostMapping("/doRegister")
    public String doRegister(@Valid User user, BindingResult bindingResult) {
        ValidationUtils.validateRegister(user, bindingResult);

        if (bindingResult.hasErrors())
            return "register.html";

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("ROLE_USER");

        userRepository.save(user);

        return "redirect:/register?success";
    }

    @GetMapping("/login")
    public String login(User user, Model model) {
        model.addAttribute("user", user);
        return "register.html";
    }

}
