package com.example.Travelme.utils;

import com.example.Travelme.entity.User;
import org.apache.commons.lang3.StringUtils;
import org.springframework.validation.BindingResult;

public class ValidationUtils {

    public static void validateRegister(User user, BindingResult bindingResult) {
        if (StringUtils.isBlank(user.getName()))
            bindingResult.rejectValue("name", "error.name", "The name cannot be blank");

        if (StringUtils.isBlank(user.getEmail()))
            bindingResult.rejectValue("email", "error.email", "The email cannot be blank");

        if (StringUtils.isBlank(user.getPassword()))
            bindingResult.rejectValue("password", "error.password", "The password cannot be blank");
    }

}
